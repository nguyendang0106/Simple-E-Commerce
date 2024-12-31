import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import ProfileIcon from '../assest/ProfileIcon.jpg';


const Header = () => {
  const user = useSelector(state => state?.user?.user) // Sử dụng Redux để lấy trạng thái người dùng từ store
  const dispatch = useDispatch() // Sử dụng useDispatch để gửi action đến store. Dùng để thay đổi trạng thái Redux.
  const [menuDisplay,setMenuDisplay] = useState(false) // useState là hook quản lý trạng thái nội bộ của component.
  const context = useContext(Context) // Truy cập dữ liệu từ Context API (số lượng sản phẩm trong giỏ hàng).
  const navigate = useNavigate() // Sử dụng hook useNavigate để chuyển hướng trang.
  const searchInput = useLocation() // Trả về thông tin về URL hiện tại, bao gồm pathname và search.
  const URLSearch = new URLSearchParams(searchInput?.search) // Sử dụng URLSearchParams để phân tích và trích xuất dữ liệu từ query string của URL.
  const searchQuery = URLSearch.getAll("q") // Lấy danh sách các giá trị của tham số q trong query string. Nếu URL là /search?q=laptop, URLSearch.getAll("q") trả về: ["laptop"]
  const [search,setSearch] = useState(searchQuery) // Lưu trữ giá trị tìm kiếm người dùng nhập vào.



  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null)) // Xóa trạng thái người dùng khỏi store.
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
          <div className='' title="Trang chủ">
                <Link to={"/"}>
                    <Logo w={50} h={80}/>
                </Link>
          </div>

          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
            <input type='text' placeholder='Tìm kiếm sản phẩm...' className='w-full outline-none' onChange={handleSearch} value={search}/>
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch/>
            </div>
          </div>


          <div className='flex items-center gap-7'>

            <div className='relative flex justify-center'>

               {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={ProfileIcon} className='w-14 h-14 rounded-full' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                }


                {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                          <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                          <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Đơn hàng</Link>
                          </nav>
                      </div>
                    )
                }
                
            </div>

                  {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><FaShoppingCart/></span>
      
                          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }

            <div>
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Đăng xuất</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Đăng nhập</Link>
                    )
                  }
            </div>

          </div>

      </div>
    </header>
  )
}

export default Header
