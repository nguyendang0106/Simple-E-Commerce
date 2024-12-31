import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/Banner1.jpg'
import image2 from '../assest/banner/Banner2.webp'
import image3 from '../assest/banner/Banner3.jpg'
import image4 from '../assest/banner/Banner4.jpg'
import image5 from '../assest/banner/Banner5.png'


import image1Mobile from '../assest/banner/Banner1.jpg'
import image2Mobile from '../assest/banner/Banner2.webp'
import image3Mobile from '../assest/banner/Banner3.jpg'
import image4Mobile from '../assest/banner/Banner4.jpg'
import image5Mobile from '../assest/banner/Banner5.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0) // Lưu chỉ số của ảnh hiện tại đang được hiển thị (bắt đầu từ 0).

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){ // Kiểm tra nếu chưa phải ảnh cuối, tăng currentImage lên 1.
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){ // Kiểm tra nếu chưa phải ảnh đầu tiên, giảm currentImage xuống 1.
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{ // Sử dụng setInterval để chuyển ảnh tự động sau mỗi 5 giây.
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-1 rounded mt-4 '>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button> 
                    </div>
                </div>

                {/**desktop and tablet version: Desktop chỉ hiển thị khi màn hình >= 768px */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              </div>


                {/**mobile version: Mobile chỉ hiển thị khi màn hình < 768px. */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover'/>
                            </div>
                            )
                        })
                }
              </div>


        </div>
    </div>
  )
}

export default BannerProduct