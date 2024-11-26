// const addToCartModel = require("../../models/cartProduct")

// const addToCartController = async(req,res)=>{
//     try{
//         const { productId } = req?.body
//         const currentUser = req.userId

//         const isProductAvailable = await addToCartModel.findOne({ productId })

//         console.log("isProductAvailabl   ",isProductAvailable)

//         if(isProductAvailable){
//             return res.json({
//                 message : "Sản phẩm đã có trong giỏ hàng",
//                 success : false,
//                 error : true
//             })
//         }

//         const payload  = {
//             productId : productId,
//             quantity : 1,
//             userId : currentUser,
//         }

//         const newAddToCart = new addToCartModel(payload)
//         const saveProduct = await newAddToCart.save()


//         return res.json({
//             data : saveProduct,
//             message : "Sản phẩm đã được thêm vào giỏ hàng",
//             success : true,
//             error : false
//         })
        

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }


// module.exports = addToCartController

const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        // Kiểm tra nếu `productId` hoặc `currentUser` không hợp lệ
        if (!productId || !currentUser) {
            return res.status(400).json({
                message: "ID sản phẩm hoặc ID người dùng không hợp lệ.",
                success: false,
                error: true,
            });
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng của người dùng hiện tại chưa
        const isProductAvailable = await addToCartModel.findOne({ 
            productId, 
            userId: currentUser 
        });

        console.log("isProductAvailable:", isProductAvailable);

        if (isProductAvailable) {
            // Nếu sản phẩm đã có, tăng số lượng lên 1
            const updatedProduct = await addToCartModel.findByIdAndUpdate(
                isProductAvailable._id,
                { $inc: { quantity: 1 } },
                { new: true }
            );

            return res.status(200).json({
                data: updatedProduct,
                message: "Sản phẩm đã có trong giỏ hàng, số lượng đã được cập nhật.",
                success: true,
                error: false,
            });
        }

        // Tạo payload cho sản phẩm mới
        const payload = {
            productId,
            quantity: 1,
            userId: currentUser,
        };

        // Tạo sản phẩm mới trong giỏ hàng
        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.status(201).json({
            data: saveProduct,
            message: "Sản phẩm đã được thêm vào giỏ hàng",
            success: true,
            error: false,
        });

    } catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;
