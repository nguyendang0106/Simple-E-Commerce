import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayVNDCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
import CategoryWiseProductDisplayCart from '../components/CategoryWiseProductDisplayCart';

const Cart = () => {
    const [data, setData] = useState([]); // Lưu trữ dữ liệu giỏ hàng.
    const [loading, setLoading] = useState(false); // Xác định trạng thái đang tải dữ liệu.
    const context = useContext(Context); // Sử dụng Context để lấy dữ liệu giỏ hàng.
    const loadingCart = new Array(4).fill(null); // Mảng 4 phần tử null để tạo skeleton loading.

    // Hàm fetch dữ liệu giỏ hàng.
    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, { // Gửi yêu cầu đến API để lấy dữ liệu giỏ hàng.
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json',
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    // Gọi hàm fetchData khi component được render lần đầu tiên.
    const handleLoading = async () => {
        await fetchData();
    };

    // Gọi hàm handleLoading khi component được render lần đầu tiên.
    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    // Hàm tăng số lượng sản phẩm trong giỏ hàng.
    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, { // Gửi yêu cầu đến API để cập nhật số lượng sản phẩm trong giỏ hàng.
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1,
            }),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    // Hàm giảm số lượng sản phẩm trong giỏ hàng.
    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, { // Gửi yêu cầu đến API để cập nhật số lượng sản phẩm trong giỏ hàng.
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json',
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng.
    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, { // Gửi yêu cầu đến API để xóa sản phẩm khỏi giỏ hàng.
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify({
                _id: id,
            }),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    // Hàm xử lý thanh toán.
    const handlePayment = async () => {
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // Lấy public key từ biến môi trường.
        const response = await fetch(SummaryApi.payment.url, { // Gửi yêu cầu đến API để thanh toán.
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json',
            },
            body: JSON.stringify({
                cartItems: data,
            }),
        });

        const responseData = await response.json();

        if (responseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: responseData.id });
        }

        console.log("payment response", responseData);
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0); // Tính tổng số lượng sản phẩm trong giỏ hàng.
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0); // Tính tổng tiền trong giỏ hàng.

    return (
        <div className='container mx-auto p-4'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5'>Không có dữ liệu</p>
                )}
            </div>

            {/** Bảng sản phẩm */}
            {data.length > 0 && (
                <div className='overflow-x-auto shadow-lg border rounded-lg' style={{marginBottom:'30px'}}>
                    <table className='min-w-full table-auto bg-white'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-4 text-center text-lg'>Sản Phẩm</th>
                                <th className='px-4 py-4 text-left text-lg'>Thông Tin</th>
                                <th className='px-4 py-4 text-left text-lg'>Đơn Giá</th>
                                <th className='px-4 py-4 text-left text-lg'>Số Lượng</th>
                                <th className='px-4 py-4 text-left text-lg'>Số Tiền</th>
                                <th className='px-4 py-4 text-left text-lg'>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? loadingCart.map((_, index) => (
                                      <tr key={index} className='animate-pulse'>
                                          <td className='px-4 py-4 bg-slate-200 h-16'></td>
                                          <td className='px-4 py-4 bg-slate-200 h-16'></td>
                                          <td className='px-4 py-4 bg-slate-200 h-16'></td>
                                          <td className='px-4 py-4 bg-slate-200 h-16'></td>
                                          <td className='px-4 py-4 bg-slate-200 h-16'></td>
                                          <td className='px-4 py-4 bg-slate-200 h-16'></td>
                                      </tr>
                                  ))
                                : data.map((product) => (
                                      <tr key={product?._id} className='border-b'>
                                         <td className='px-0 py-4 text-center align-middle'>
                                                <div className='flex justify-center items-center h-full'>
                                                    <img
                                                        src={product?.productId?.productImage[0]}
                                                        alt={product?.productId?.productName}
                                                        style={{
                                                            maxHeight: '100px',
                                                            width: 'auto',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                </div>
                                          </td>
                                          <td className='px-4 py-4'>
                                              <p className='font-semibold' style={{ fontSize: '18px' }}>{product?.productId?.category}</p>
                                              <p className='text-sm text-gray-600' style={{ fontSize: '17px' }}>{product?.productId?.productName}</p>
                                          </td>
                                          <td className='px-4 py-4'>{displayVNDCurrency(product?.productId?.sellingPrice)}</td>
                                          <td className='px-4 py-4'>
                                              <div className='flex items-center gap-2'>
                                                  <button
                                                      className='border border-red-600 text-red-600 px-3 py-1 rounded'
                                                      onClick={() => decraseQty(product?._id, product?.quantity)}
                                                  >
                                                      -
                                                  </button>
                                                  <span>{product?.quantity}</span>
                                                  <button
                                                      className='border border-red-600 text-red-600 px-2.5 py-1 rounded'
                                                      onClick={() => increaseQty(product?._id, product?.quantity)}
                                                  >
                                                      +
                                                  </button>
                                              </div>
                                          </td>
                                          <td className='px-4 py-4 text-red-600 font-semibold'>
                                              {displayVNDCurrency(product?.productId?.sellingPrice * product?.quantity)}
                                          </td>
                                          <td className='px-9 py-4'>
                                              <button
                                                  className='text-red-600 hover:text-red-800'
                                                  onClick={() => deleteCartProduct(product?._id)}
                                              >
                                                  <MdDelete size={25} />
                                              </button>
                                          </td>
                                      </tr>
                                  ))}
                            <tr>
                                <td colSpan="6" className='text-right px-9 py-7 font-semibold' style={{ fontSize: '20px' }}>
                                    <div>
                                        Tổng thanh toán ({totalQty} sản phẩm) : 
                                        <span className='text-red-600'> {displayVNDCurrency(totalPrice)}</span>
                                    </div>
                                    <div className='mt-4'>
                                        <button
                                            className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800'
                                            onClick={handlePayment}
                                        >
                                            Thanh Toán
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            )}
            {
                data.length > 0 && (
                    <CategoryWiseProductDisplayCart heading={"Có thể bạn cũng thích"} />
                )
            }

        </div>
    );
};

export default Cart;
