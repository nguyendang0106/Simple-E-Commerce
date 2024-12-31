import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    // Mục đích: Quản lý trạng thái vai trò được chọn trong dropdown (mặc định là vai trò hiện tại).
    // Khi thay đổi: Cập nhật giá trị mới khi người dùng chọn vai trò khác từ menu thả xuống.
    const [userRole,setUserRole] = useState(role)

    // Ghi nhận vai trò mới được chọn từ dropdown.
    // Cập nhật giá trị của userRole bằng setUserRole.
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    // Mục đích: Gửi yêu cầu đến API để cập nhật vai trò người dùng.
    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose() // Đây là một hàm callback được gọi để đóng cửa sổ/modal sau khi cập nhật thành công
            callFunc() // để cập nhật UI ngay sau khi cập nhật vai trò
        }

        console.log("role updated",responseData)

    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto' onClick={onClose}>
                <IoMdClose/>
            </button>

            <h1 className='pb-4 text-lg font-medium'>Thay đổi vai trò người dùng</h1>

             <p>Tên : {name}</p>   
             <p>Email : {email}</p> 

            <div className='flex items-center justify-between my-4'>
                <p>Vai trò :</p>  
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>


            <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Thay đổi vai trò</button>
       </div>
    </div>
  )
}

export default ChangeUserRole