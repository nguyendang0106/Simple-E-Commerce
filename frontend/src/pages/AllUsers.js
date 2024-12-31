import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([]) // Dùng để lưu danh sách tất cả người dùng được lấy từ API.
    const [openUpdateRole,setOpenUpdateRole] = useState(false) // Dùng để kiểm soát hiển thị component chỉnh sửa vai trò người dùng (ChangeUserRole). Mặc định là false, nghĩa là ban đầu form chỉnh sửa không hiển thị.
    const [updateUserDetails,setUpdateUserDetails] = useState({ // Lưu thông tin của người dùng đang được chỉnh sửa (email, tên, vai trò, ID).
        email : "",
        name : "",
        role : "",   
        _id  : ""
    })

    // Gửi yêu cầu đến API (SummaryApi.allUser) để lấy danh sách người dùng từ server.
    // Cập nhật trạng thái allUser với dữ liệu trả về.
    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    // Tự động gọi fetchAllUsers ngay khi component được mount.
    // Kết quả là danh sách người dùng được tải và hiển thị trong bảng.
    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Ngày khởi tạo</th>
                    <th>Hoạt động</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    allUser.map((el,index) => {
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)
                                    }}
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
    </div>
  )
}

export default AllUsers 