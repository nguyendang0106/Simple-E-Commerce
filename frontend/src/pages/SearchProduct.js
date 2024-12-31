import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation() // Lấy query từ URL
    const [data,setData] = useState([]) // Lưu trữ dữ liệu sản phẩm tìm kiếm được từ API.
    const [loading,setLoading] = useState(false) // Xác định trạng thái tải dữ liệu.

    console.log("query",query.search)

    // Hàm fetch dữ liệu sản phẩm theo từ khóa tìm kiếm.
    const fetchProduct = async()=>{
        setLoading(true) // Bắt đầu trạng thái loading
        const response = await fetch(SummaryApi.searchProduct.url+query.search) // Gửi yêu cầu API để lấy dữ liệu sản phẩm theo từ khóa tìm kiếm.
        const dataResponse = await response.json()
        setLoading(false) // Kết thúc trạng thái loading

        setData(dataResponse.data)
    }

    // Gọi hàm fetchProduct khi component được render lần đầu tiên.
    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-lg font-semibold my-3'>Kết quả tìm kiếm : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>Không tìm thấy dữ liệu....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct