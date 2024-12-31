import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl, // URL của hình ảnh cần hiển thị.
    onClose // Hàm callback được gọi khi người dùng nhấn nút đóng (để đóng pop-up).
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>

        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>

                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} className='w-full h-full'/> 
                </div>
        </div>
  


    </div>
  )
}

export default DisplayImage

// dùng để hiển thị một hình ảnh trên giao diện dưới dạng pop-up (toàn màn hình). 
// Người dùng có thể đóng pop-up bằng cách nhấn vào biểu tượng "đóng".
// Khi DisplayImage được render, nó sẽ phủ toàn bộ màn hình và hiển thị hình ảnh được truyền vào qua imgUrl.