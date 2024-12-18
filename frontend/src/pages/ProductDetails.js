import React, { useCallback, useContext, useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import displayVNDCurrency from '../helpers/displayCurrency';
// import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)
  const [reviews, setReviews] = useState([  
    {
      username: 'trịnh hải nam',
      rating: 5,
      comment: 'tai nghe rất bền, nghe khá là OK',
      images: [
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lw08jwan0jq162.webp',
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lw08jwamz4yj82.webp',
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lwbce1g63efvad.webp'
      ],
    },
    {
      username: 'phúc đầu bò',
      rating: 1,
      comment: 'thực sự là k cần gì để khen vì nó như cứt',
      images: [
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lxf22tx7o3ixa9.webp',
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lxf22txhkvkr95.webp',
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lxf22tzfjftnf1.webp'
      ],
    },
    {
      username: 'người tình của jack',
      rating: 3,
      comment: 'sản phẩm xịn xò, đáng tiếc là giá 5 triệu là quá cao',
      images: [
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lx1vj401y8rf40.webp',
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lx1vj401y8yhe1.webp',
        'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lxxsfgaji4m131.webp'
      ],
    }
  ]);
  const [newReview, setNewReview] = useState({ username: '', rating: 0, comment: '', images: [] });
  const [selectedImage, setSelectedImage] = useState('');
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { ...newReview }]);  // Thêm đánh giá mới vào danh sách
    setNewReview({ username: '', rating: 0, comment: '', images: [] }); // Reset form
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const navigate = useNavigate()

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])

  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }


  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
          {/***product Image */}
          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

              <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                  <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

                    {/**product zoom */}
                    {
                      zoomImage && (
                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                          <div
                            className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                            style={{
                              background : `url(${activeImage})`,
                              backgroundRepeat : 'no-repeat',
                              backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
    
                            }}
                          >
    
                          </div>
                        </div>
                      )
                    }
                  
              </div>

              <div className='h-full'>
                  {
                    loading ? (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          productImageListLoading.map((el,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                              </div>
                            )
                          })
                        }
                      </div>
                      
                    ) : (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          data?.productImage?.map((imgURL,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  }
              </div>
          </div>

           {/***product details */}
           {
            loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
    
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                  <p className='text-red-600 bg-slate-200 w-full'></p>
                  <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                </div>

                <div className='flex items-center gap-3 my-2 w-full'>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                </div>

                <div className='w-full'>
                  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                  <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                </div>
              </div>
            ) : 
            (
              <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='text-red-600 flex items-center gap-1'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    {/* <FaStarHalf/> */}
                    <FaStar/>
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-red-600'>{displayVNDCurrency(data.sellingPrice)}</p>
                  <p className='text-slate-400 line-through'>{displayVNDCurrency(data.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Mua</button>
                  <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={(e)=>handleAddToCart(e,data?._id)}>
                    <div className='flex items-center gap-2'>
                       <BsCartPlus/>
                       <span>Thêm vào giỏ hàng</span>
                    </div>
                  </button>
                </div>

                <div>
                  <p className='text-slate-600 font-medium my-1'>Mô tả sản phẩm : </p>
                  <p>{data?.description}</p>
                </div>
              </div>
            )
           }

      </div>



      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Có thể bạn cũng thích"}/>
        )
      }
      <div className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>Đánh giá của khách hàng</h3>

        {/* Hiển thị các đánh giá */}
        {reviews.map((review, index) => (
          <div key={index} className='border rounded-lg p-4 mb-4'>
            <p className='font-medium'>{review.username}</p>
            <div className='flex'>
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} color={i < review.rating ? 'gold' : 'gray'} />
              ))}
            </div>
            <p>{review.comment}</p>
            {/* Hiển thị hình ảnh đánh giá */}
            <div className='flex gap-2 mt-2'>
              {review.images.map((img, i) => (
                <img key={i} src={img} alt='review' className='w-16 h-16 object-cover rounded' />
              ))}
            </div>
          </div>
        ))}

        {/* Form nhập đánh giá */}
        <form onSubmit={handleReviewSubmit} className='mt-4'>
          <h4 className='text-lg font-medium mb-2'>Để lại đánh giá của bạn</h4>
          <input
            type='text'
            placeholder='Tên của bạn'
            value={newReview.username}
            onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
            className='border rounded w-full p-2 mb-2'
          />
          <input
            type='number'
            placeholder='Số sao (1-5)'
            value={newReview.rating}
            max={5}
            min={1}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            className='border rounded w-full p-2 mb-2'
          />
          <textarea
            placeholder='Nội dung đánh giá'
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className='border rounded w-full p-2 mb-2'
          />
          <button
            type='submit'
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
          >
            Gửi đánh giá
          </button>
        </form>
      </div>
     



    </div>
  )
}

export default ProductDetails