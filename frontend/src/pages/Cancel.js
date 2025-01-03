import React from 'react'
import FAILIMAGE from '../assest/cancel2.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
      <img
         src = {FAILIMAGE}
         width = {250}
         height = {200}
      />
      <p className='text-red-600 font-bold test-xl'>Thanh toán thất bại</p>
      <Link to={"/cart"} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Đi tới giỏ hàng</Link>
    </div>  
  )
}

export default Cancel
