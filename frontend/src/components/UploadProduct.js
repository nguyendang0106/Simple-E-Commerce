import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData
}) => {
  const [data,setData] = useState({ // data: Trạng thái lưu thông tin sản phẩm,
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false) // Quản lý trạng thái hiển thị hình ảnh toàn màn hình.
  const [fullScreenImage,setFullScreenImage] = useState("") // URL của hình ảnh được hiển thị toàn màn hình.

  // Lấy giá trị từ input (name và value) và cập nhật vào trạng thái data.
  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

  // Tải hình ảnh sản phẩm lên Cloudinary.
  const handleUploadProduct = async(e) => {
    const file = e.target.files[0] // Lấy tệp hình ảnh từ input.
    const uploadImageCloudinary = await uploadImage(file) // Gọi hàm uploadImage để tải hình ảnh lên Cloudinary.

    // Cập nhật trạng thái data với URL hình ảnh mới.
    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url] // Thêm URL hình ảnh mới vào mảng hình ảnh sản phẩm.
      }
    })
  }

  // Xóa hình ảnh khỏi trạng thái data.
  const handleDeleteProductImage = async(index)=>{
    console.log("image index",index)
    
    const newProductImage = [...data.productImage] // Sao chép mảng hình ảnh sản phẩm.
    newProductImage.splice(index,1) // Xóa hình ảnh tại vị trí index.

    // Cập nhật trạng thái data với mảng hình ảnh mới.
    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage] // Cập nhật mảng hình ảnh mới.
      }
    })
    
  }


   {/**upload product */}
  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    // Gửi yêu cầu POST đến API để tải sản phẩm lên.
    const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const responseData = await response.json() // Chuyển dữ liệu nhận được từ API sang dạng JSON.

    if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchData() // Gọi hàm fetchData để cập nhật danh sách sản phẩm.
    }


    if(responseData.error){
      toast.error(responseData?.message)
    }
  

  }

  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
       <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Tải sản phẩm lên</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>
            </div>

          <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' 
          onSubmit={handleSubmit}
          >
            <label htmlFor='productName'>Tên sản phẩm :</label>
            <input 
              type='text' 
              id='productName' 
              placeholder='Nhập tên sản phẩm' 
              name='productName'
              value={data.productName} 
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />


            <label htmlFor='brandName' className='mt-3'>Tên thương hiệu :</label>
            <input 
              type='text' 
              id='brandName' 
              placeholder='Nhập tên thương hiệu' 
              value={data.brandName} 
              name='brandName'
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />

              <label htmlFor='category' className='mt-3'>Danh mục :</label>
              <select 
              required 
              value={data.category} name='category' 
              onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded'
              >
                  <option value={""}>Lựa chọn danh mục</option>
                  {
                    productCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
              </select>

              <label htmlFor='productImage' className='mt-3'>Hình ảnh sản phẩm :</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                            <span className='text-4xl'><FaCloudUploadAlt/></span>
                            <p className='text-sm'>Tải lên hình ảnh sản phẩm</p>
                            <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                        </div>
              </div>
              </label> 


              <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-slate-100 border cursor-pointer'  
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}/>

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' 
                                        onClick={()=>handleDeleteProductImage(index)}
                                        >
                                          <MdDelete/>  
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*Vui lòng tải lên hình ảnh sản phẩm</p>
                    )
                  }
                  
              </div>

              <label htmlFor='price' className='mt-3'>Giá sản phẩm :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='Nhập giá sản phẩm' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />


              <label htmlFor='sellingPrice' className='mt-3'>Giá bán sản phẩm :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='Nhập giá bán sản phẩm' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='description' className='mt-3'>Mô tả sản phẩm :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='Nhập mô tả sản phẩm' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>



              <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Tải sản phẩm lên</button>
          </form> 



      
       </div>



       {/*display image full screen*/}
       {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }
        

    </div>
  )
}

export default UploadProduct