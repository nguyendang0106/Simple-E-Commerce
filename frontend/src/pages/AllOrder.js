import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayVNDCurrency from '../helpers/displayCurrency'

const AllOrder = () => {
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [expandedOrderId, setExpandedOrderId] = useState(null) // Trạng thái theo dõi đơn hàng được mở

    // Fetch danh sách đơn hàng
    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
            credentials: 'include',
        })

        const responseData = await response.json()

        setData(responseData.data)
        console.log("order list", responseData)
    }

    // Fetch danh sách người dùng
    const fetchAllUsers = async () => {
        const response = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include',
        })

        const responseData = await response.json()
        if (responseData.success) {
            setUsers(responseData.data)
        }
    }

    useEffect(() => {
        fetchOrderDetails()
        fetchAllUsers()
    }, [])

    // Ánh xạ userId với thông tin người dùng
    const getUserDetails = (userId) => {
        return users.find((user) => user._id === userId) || {}
    }

    // Toggle trạng thái mở/đóng thông tin đơn hàng
    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
    }

    return (
        <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
            {
                !data[0] && (
                    <p>Không có đơn đặt hàng nào</p>
                )
            }

            <div className='p-4 w-full'>
                {
                    data.map((item, index) => {
                        const userDetails = getUserDetails(item.userId)
                        const isExpanded = expandedOrderId === item._id // Kiểm tra xem đơn hàng có đang được mở không
                        return (
                            <div key={item.userId + index} className="mb-4 border rounded p-4">
                                <div className="flex justify-between items-center">
                                  <p className='font-medium text-lg'>{moment(item.createdAt).format('LLL')}</p>
                                    <button
                                        onClick={() => toggleOrderDetails(item._id)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {isExpanded ? "Ẩn thông tin đơn hàng" : "Hiện thông tin đơn hàng"}
                                    </button>
                                </div>

                                {isExpanded && ( // Hiển thị chi tiết đơn hàng nếu trạng thái được mở
                                    <div className='mt-4'>
                                        <div className='flex flex-col lg:flex-row justify-between'>
                                            <div className='grid gap-1'>
                                                {item?.productDetails.map((product, index) => (
                                                    <div key={product.productId + index} className='flex gap-3 bg-slate-100'>
                                                        <img
                                                            src={product.image[0]}
                                                            className='w-28 h-20 bg-slate-200 object-scale-down p-2'
                                                        />
                                                        <div>
                                                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                                            <div className='flex items-center gap-5 mt-1'>
                                                                <div className='text-lg text-red-500'>{displayVNDCurrency(product.price)}</div>
                                                                <p>Số lượng : {product.quantity}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                                                <div>
                                                    <div className="text-lg font-medium">Thông tin người mua:</div>
                                                    <p className="ml-1">Tên: {userDetails.name || "N/A"}</p>
                                                    <p className="ml-1">Email: {userDetails.email || "N/A"}</p>
                                                    <p className="ml-1">Vai trò: {userDetails.role || "N/A"}</p>
                                                </div>

                                                <div>
                                                    <div className='text-lg font-medium'>Thông tin thanh toán : </div>
                                                    <p className='ml-1'>Phương thức thanh toán : {item.paymentDetails.payment_method_type[0]}</p>
                                                    <p className='ml-1'>Trạng thái thanh toán : {item.paymentDetails.payment_status}</p>
                                                </div>

                                                <div>
                                                    <div className='text-lg font-medium'>Chi tiết vận chuyển : </div>
                                                    {
                                                        item.shipping_options.map((shipping, index) => (
                                                            <div key={shipping.shipping_rate} className='ml-1'>
                                                                Số tiền vận chuyển : {displayVNDCurrency(shipping.shipping_amount)}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className='font-semibold ml-auto w-fit lg:text-lg'>
                                            Tổng số tiền : {displayVNDCurrency(item.totalAmount)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllOrder

