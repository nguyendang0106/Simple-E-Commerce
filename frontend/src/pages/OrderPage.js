import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayVNDCurrency from '../helpers/displayCurrency'

const OrderPage = () => {
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])

  // Fetch danh sách đơn hàng
  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    })

    const responseData = await response.json()

    setData(responseData.data)
    console.log("order list", responseData)
  }

  // Fetch danh sách người dùng
  const fetchUsers = async () => {
    const response = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const responseData = await response.json()
    if (responseData.success) {
      setUsers(responseData.data)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
    fetchUsers()
  }, [])

  // Tìm thông tin người mua theo userId
  const getUserDetails = (userId) => {
    return users.find(user => user._id === userId) || {}
  }

  return (
    <div>
      {
        !data[0] && (
          <p className='text-xl'>Không có đơn đặt hàng nào</p>
        )
      }

      <div className='p-4 w-full'>
        {
          data.map((item, index) => {
            const buyerDetails = getUserDetails(item.userId) // Lấy thông tin người mua
            return (
              <div 
                key={item.userId + index} 
                className='p-6 mb-8 bg-white rounded-lg shadow-lg'>
                <p className='font-medium text-2xl mb-4'>{moment(item.createdAt).format('LL')}</p>
                <div className='border rounded-lg overflow-hidden'>
                  <div className='flex flex-col lg:flex-row justify-between gap-6'>
                    <div className='grid gap-4 flex-1'>
                      {
                        item?.productDetails.map((product, index) => {
                          return (
                            <div 
                              key={product.productId + index} 
                              className='flex gap-4 bg-gray-100 p-4 rounded-lg shadow-sm'>
                              <img
                                src={product.image[0]}
                                className='w-32 h-24 bg-gray-200 object-scale-down p-2 rounded-md'
                              />
                              <div>
                                <div className='font-medium text-xl text-ellipsis line-clamp-1'>{product.name}</div>
                                <div className='flex items-center gap-6 mt-2'>
                                  <div className='text-xl text-red-500'>{displayVNDCurrency(product.price)}</div>
                                  <p>Số lượng: {product.quantity}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='flex flex-col gap-6 p-6 bg-gray-50 rounded-lg shadow-md min-w-[320px]'>
                      <div>
                        <div className='text-xl font-medium mb-3'>Thông tin người mua:</div>
                        <p className='ml-2 text-xl'>Tên: {buyerDetails.name || 'N/A'}</p>
                        <p className='ml-2 text-xl'>Email: {buyerDetails.email || 'N/A'}</p>
                      </div>
                      <div>
                        <div className='text-xl font-medium mb-3'>Thông tin thanh toán:</div>
                        <p className='ml-2 text-xl'>Phương thức thanh toán: {item.paymentDetails.payment_method_type[0]}</p>
                        <p className='ml-2 text-xl'>Trạng thái thanh toán: {item.paymentDetails.payment_status}</p>
                      </div>

                      <div>
                        <div className='text-xl font-medium mb-3'>Chi tiết vận chuyển:</div>
                        {
                          item.shipping_options.map((shipping, index) => {
                            return (
                              <div key={shipping.shipping_rate} className='ml-2 text-xl'>
                                Số tiền vận chuyển: <span className='text-red-500 font-semibold'>{displayVNDCurrency(shipping.shipping_amount)}</span></div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div className='font-semibold ml-auto w-fit text-xl mt-6 mr-4 mb-4'>
                    Tổng số tiền: <span className='text-red-500'>{displayVNDCurrency(item.totalAmount)}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage