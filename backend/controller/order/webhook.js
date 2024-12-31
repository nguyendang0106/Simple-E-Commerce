const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');
const addToCartModel = require('../../models/cartProduct');


const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY; // Lấy secret key từ biến môi trường.

async function getLineItems(lineItems) { // Lấy thông tin sản phẩm từ lineItems.
  let ProductItems = [] // Khởi tạo mảng chứa thông tin sản phẩm.

  if(lineItems?.data?.length) { // Nếu lineItems không rỗng thì duyệt qua từng item trong lineItems.
    for(const item of lineItems.data) { // Duyệt qua từng item trong lineItems.
      const product = await stripe.products.retrieve(item.price.product) // Lấy thông tin sản phẩm từ product id.
      const productId = product.metadata.productId // Lấy productId từ metadata của product.

      const productData = { // Tạo object chứa thông tin sản phẩm.
        productId : productId,
        name : product.name,
        price : item.price.unit_amount,
        quantity : item.quantity,
        image : product.images
      }
      ProductItems.push(productData) // Thêm thông tin sản phẩm vào mảng ProductItems.
    }
  }

  return ProductItems
}

const webhooks = async(request, response)=>{ // Xử lý webhook từ stripe.
    const sig = request.headers['stripe-signature']; // Lấy signature từ header.

    const payloadString = JSON.stringify(request.body) // Lấy payload từ request. 

    const header = stripe.webhooks.generateTestHeaderString({ // Tạo header từ payload và secret key.
        payload: payloadString,
        secret : endpointSecret,
      });

    let event;

    try {
       event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    }
    catch (err) {
       response.status(400).send(`Webhook Error: ${err.message}`);
    }


    // Handle the event
  switch (event.type) {
   case 'checkout.session.completed':
     const session = event.data.object;
   //   console.log(`PaymentIntent for ${session.amount} was successful!`);
     
     const lineItems = await stripe.checkout.sessions.listLineItems(session.id) // Lấy thông tin lineItems từ session.

     const productDetails = await getLineItems(lineItems) // Lấy thông tin sản phẩm từ lineItems.

     const orderDetails = { // Tạo object chứa thông tin đơn hàng.
      productDetails : productDetails,
      email : session.customer_email,
      userId : session.metadata.userId,
      paymentDetails : {
        paymentId : session.payment_intent,
        payment_method_type : session.payment_method_types,
        payment_status : session.payment_status,
      },
      shipping_options : session.shipping_options.map(s => {
        return { 
          ...s, 
          shipping_amount : s.shipping_amount 
        }
      }),
      totalAmount : session.amount_total
    }

    const order = new orderModel(orderDetails) // Tạo đơn hàng từ orderDetails.
    const saveOrder = await order.save() // Lưu đơn hàng vào database.

    if(saveOrder?._id){ // Nếu lưu đơn hàng thành công thì xóa giỏ hàng của user.
      const deleteCartItem = await addToCartModel.deleteMany({ userId : session.metadata.userId }) // Xóa giỏ hàng của user.
    }
     break;
  //  case 'payment_method.attached':
  //    const paymentMethod = event.data.object;
  //    // Then define and call a method to handle the successful attachment of a PaymentMethod.
  //    // handlePaymentMethodAttached(paymentMethod);
  //    break;
   default:
     // Unexpected event type
     console.log(`Unhandled event type ${event.type}.`);
 }

    response.status(200).send();
}

module.exports = webhooks

// xử lý các sự kiện webhook từ Stripe, 
// bao gồm việc quản lý đơn hàng sau khi thanh toán thành công trên Stripe.