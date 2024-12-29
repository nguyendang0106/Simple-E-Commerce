import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchAllProducts from '../helpers/fecthAllProducts';
import productCategory from '../helpers/productCategory';
import displayVNDCurrency from '../helpers/displayCurrency';
import displayPercentCurrency from '../helpers/displayPercent';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const HotProduct = ({ heading }) => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context);
    

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const allProduct = await fetchAllProducts();
        setLoading(false);

        console.log("hotproduct data",allProduct)
        setData(allProduct);
    };

    const getRandomProducts = (products, count) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
    
            <div className="grid grid-cols-3 gap-x-3 rounded-lg mr-40 ml-40">
                {data && getRandomProducts(data, 3).map((product, index) => (
                    <Link to={"product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                        <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                            <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                                <p className='text-red-600 font-medium'>{ displayVNDCurrency(product?.sellingPrice) }</p>
                                <p className='text-slate-500 line-through'>{ displayVNDCurrency(product?.price)  }</p>
                                <p className='text-red-500 font-bold'>{ displayPercentCurrency(((product?.price - product?.sellingPrice) / product?.price))  }</p>
                            </div>
                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Thêm vào giỏ hàng</button>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    );
        
};

export default HotProduct;
