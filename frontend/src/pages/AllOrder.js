import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayVNDCurrency from '../helpers/displayCurrency'

const AllOrder = () => {
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [expandedOrderId, setExpandedOrderId] = useState(null)

    // Lấy trạng thái duyệt từ localStorage
    const getLocalApprovedStatus = () => {
      const savedStatus = localStorage.getItem('approvedOrders');
      return savedStatus ? JSON.parse(savedStatus) : {};
    };

    // Lưu trạng thái duyệt vào localStorage
    const saveLocalApprovedStatus = (status) => {
        localStorage.setItem('approvedOrders', JSON.stringify(status));
    };

    // Fetch danh sách đơn hàng
    const fetchOrderDetails = async () => {
      const response = await fetch(SummaryApi.allOrder.url, {
          method: SummaryApi.allOrder.method,
          credentials: 'include',
      });
      const responseData = await response.json();

      const localApprovedStatus = getLocalApprovedStatus();
      const initializedData = responseData.data.map((order) => ({
          ...order,
          localApproved: localApprovedStatus[order._id] || false, // Khôi phục trạng thái duyệt từ localStorage
      }));
      setData(initializedData);
    };

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
        fetchOrderDetails();
        fetchAllUsers();
    }, [])

    // Ánh xạ userId với thông tin người dùng
    const getUserDetails = (userId) => {
        return users.find((user) => user._id === userId) || {}
    }

    const toggleApproveOrder = (orderId) => {
      setData((prevData) => {
          const updatedData = prevData.map((order) =>
              order._id === orderId
                  ? { ...order, localApproved: !order.localApproved }
                  : order
          );

          // Cập nhật trạng thái vào localStorage
          const localApprovedStatus = getLocalApprovedStatus();
          localApprovedStatus[orderId] = !localApprovedStatus[orderId];
          saveLocalApprovedStatus(localApprovedStatus);

          return updatedData;
      });
    };

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
                        const isExpanded = expandedOrderId === item._id
                        const isApproved = item.localApproved;
                        return (
                            <div key={item.userId + index} className="mb-4 border rounded p-4">
                                <div className="flex justify-between items-center">
                                   <p className='font-medium text-2xl mb-4'>{moment(item.createdAt).format('LLL')}</p>

                                   {/* Nút duyệt đơn hàng */}
                                    <div className="mt-4">
                                        <button
                                            onClick={() => toggleApproveOrder(item._id)}
                                            className={`px-4 py-2 rounded ${
                                                isApproved
                                                    ? 'bg-gray-400 text-white hover:bg-gray-500'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                        >
                                            {isApproved ? 'Đã duyệt' : 'Duyệt đơn hàng'}
                                        </button>
                                    </div>

                                    {/* Nút hiển thị/ẩn thông tin */}
                                    <button
                                        onClick={() => toggleOrderDetails(item._id)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {isExpanded ? "Ẩn thông tin đơn hàng" : "Hiện thông tin đơn hàng"}
                                    </button>
                                </div>

                                {isExpanded && (
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
                                                                Số tiền vận chuyển : <span className='text-red-500'>{displayVNDCurrency(shipping.shipping_amount)}</span> 
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className='font-semibold ml-auto w-fit lg:text-lg'>
                                            Tổng số tiền : <span className='text-red-500'>{displayVNDCurrency(item.totalAmount)}</span> 
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
