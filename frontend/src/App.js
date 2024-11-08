import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './componenets/Header';
import Footer from './componenets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';

function App() {

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    console.log("data-user",dataResponse)

    // if(dataApi.success){
    //   dispatch(setUserDetails(dataApi.data))
    // }
}

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    // /**user Details cart product */
    // fetchUserAddToCart()

  },[])
  return (
    <>
      <ToastContainer />

      <Header/>
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
