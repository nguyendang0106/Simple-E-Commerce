import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false) // Xác định trạng thái mở/đóng của modal tải sản phẩm. Mặc định là false.
  const [allProduct,setAllProduct] = useState([]) // Lưu danh sách sản phẩm được lấy từ API. Mặc định là mảng rỗng [].

  // Gửi yêu cầu đến API (SummaryApi.allProduct) để lấy danh sách tất cả sản phẩm từ server.
  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json() // Chuyển dữ liệu nhận được từ API sang dạng JSON.

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || []) // Cập nhật trạng thái allProduct với dữ liệu trả về từ API.
  }

  // Tự động gọi fetchAllProduct ngay khi component được mount.
  useEffect(()=>{
    fetchAllProduct()
  },[])
  
  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Tất cả sản phẩm</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' 
            onClick={()=>setOpenUploadProduct(true)}
            >
              Tải sản phẩm lên
            </button>
        </div>

        {/* *all product */}
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>

        {/**upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} 
            fetchData={fetchAllProduct}
            />
          )
        }      

    </div>
  )
}

export default AllProducts
