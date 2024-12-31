import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  // Lấy thông tin người dùng hiện tại từ API.
  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
}

// Lấy số lượng sản phẩm đã thêm vào giỏ hàng của người dùng.
const fetchUserAddToCart = async()=>{
  const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
    method : SummaryApi.addToCartProductCount.method,
    credentials : 'include'
  })

  const dataApi = await dataResponse.json()

  setCartProductCount(dataApi?.data?.count)
}

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    // /**user Details cart product */
    fetchUserAddToCart()

  },[]) // useEffect với dependency rỗng ([]) đảm bảo các hàm này chỉ chạy một lần khi component được mount.
  return (
    <>
      <Context.Provider value={{ // Sử dụng Context để chia sẻ các hàm và dữ liệu giữa các component con.
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center' // Cung cấp một vị trí trên giao diện để hiển thị thông báo (toast).
        />

        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/> 
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
