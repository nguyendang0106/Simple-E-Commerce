import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayVNDCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data, // Dữ liệu của sản phẩm hiện tại (thông tin sản phẩm sẽ được hiển thị trong thẻ).
    fetchdata // tải lại danh sách sản phẩm (sau khi chỉnh sửa)
}) => {
    const [editProduct,setEditProduct] = useState(false) // editProduct: Quản lý trạng thái mở/đóng của form chỉnh sửa sản phẩm.

  return (
    <div className='bg-white p-4 rounded '>
       <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
              <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>

                <p className='font-semibold'>
                  {
                    displayVNDCurrency(data.sellingPrice)
                  }
        
                </p>

                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                </div>

            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} 
            fetchdata={fetchdata}
            />
          )
        }
    
    </div>  
  )
}

export default AdminProductCard