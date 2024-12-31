import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({ // data: Chứa thông tin email và mật khẩu được nhập vào từ người dùng.
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name , value } = e.target // Sử dụng destructuring để lấy hai thuộc tính name và value từ phần tử HTML đang kích hoạt sự kiện.

        setData((preve)=>{
            return{
                ...preve, // Sao chép toàn bộ dữ liệu hiện tại trong data để giữ nguyên các giá trị không thay đổi.
                [name] : value // Gán giá trị value (giá trị người dùng vừa nhập) cho khóa tương ứng.
            }
        })
    }

    // Khi nhấn nút submit, hàm này sẽ được gọi.
    const handleSubmit = async(e) =>{
        e.preventDefault() // Ngăn chặn hành vi mặc định của trình duyệt khi gửi form (ví dụ: reload trang).

        const dataResponse = await fetch(SummaryApi.signIn.url,{ // Sử dụng await để thực hiện các tác vụ bất đồng bộ (ví dụ: gửi yêu cầu đến API).
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json" // Xác định kiểu dữ liệu gửi đi.
            },
            body : JSON.stringify(data) // Chuyển đổi dữ liệu từ kiểu object data sang kiểu JSON.
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart() 
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

    console.log("data login",data)


  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                 <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcons} alt='login icons'/>
                 </div>

                 <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                                <input 
                                     type='email' 
                                    placeholder='Nhập Email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                    </div>

                    <div>
                        <label>Mật khẩu : </label>
                        <div className='bg-slate-100 p-2 flex'>
                                <input 
                                   type={showPassword ? "text" : "password"} 
                                   placeholder='Nhập Mật khẩu'
                                   value={data.password}
                                   name='password' 
                                   onChange={handleOnChange}
                                   className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                {/* Quên mật khẩu? */}
                        </Link>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Đăng nhập</button>
                  </form>

                  <p className='my-5'>Bạn không có tài khoản ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Đăng ký</Link></p>

            </div>

        </div>
    </section>
  )
}

export default Login
