import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayVNDCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const HorizontalCardProduct = ({category, heading}) => { // category: Danh mục sản phẩm (dùng để fetch dữ liệu sản phẩm theo danh mục). heading: Tiêu đề của danh mục sản phẩm.
    const [data,setData] = useState([]) // data: Chứa danh sách sản phẩm được fetch về từ API.
    const [loading,setLoading] = useState(true) // loading: Xác định trạng thái tải dữ liệu (đang tải hay đã xong).
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0) // scroll: Quản lý trạng thái cuộn của danh sách.
    const scrollElement = useRef() // scrollElement: Ref trỏ đến phần tử cuộn ngang (container chứa danh sách sản phẩm).



    // Sử dụng Context để lấy dữ liệu giỏ hàng.
    const { fetchUserAddToCart } = useContext(Context)

    // Hàm thêm sản phẩm vào giỏ hàng.
    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    // Hàm fetch dữ liệu sản phẩm theo danh mục.
    const fetchData = async() =>{
        setLoading(true) // Bắt đầu trạng thái loading
        const categoryProduct = await fetchCategoryWiseProduct(category) // Lấy sản phẩm theo danh mục từ API.
        setLoading(false) // Kết thúc trạng thái loading

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data) // Lưu dữ liệu sản phẩm vào state
    }

    // Gọi hàm fetchData khi component được render lần đầu tiên.
    useEffect(()=>{
        fetchData()
    },[])

    // Hàm cuộn danh sách sang phải.
    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    // Hàm cuộn danh sách sang trái.
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                
           <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 

           {   loading ? (
                loadingList.map((product,index)=>{
                    return(
                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })
           ) : (
            data.map((product,index)=>{
                return(
                    <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex' onClick={scrollTop}>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                            <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                        </div>
                        <div className='p-3 grid'> {/*p-4 grid */}
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>{ displayVNDCurrency(product?.sellingPrice) }</p>
                                {/* <p className='text-slate-500 line-through'>{ displayVNDCurrency(product?.price)  }</p> */}
                            </div>
                            <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Thêm vào giỏ hàng</button>
                        </div>
                    </Link>
                )
            })
              )
               
             }
           </div>
            

    </div>
  )
}

export default HorizontalCardProduct