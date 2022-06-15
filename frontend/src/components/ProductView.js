import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {viewProduct} from './../actions/products';
import {addToCart} from './../actions/products';
import CLoader from "./Layouts/CLoader";
import {useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CART_PRODUCT_ERROR } from "../actions/types";
const ProductView = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector(state => state.productsApi);
  const [pquantity,setPquantity] = useState(1);
  useEffect(()=>{
    const pid = {
      'id':atob(props?.match?.params?.id)
    }
    dispatch({
      type: CART_PRODUCT_ERROR,
      payload:null,
      warningMsg:null
    });
    dispatch(viewProduct(pid));
  },[]);
  const productsDetails = product?.vproductsData?.data?.product;
  const productImages = product?.vproductsData?.data?.product_images;
  const handleQuantityCount = (evt) => {
    if(pquantity > 0){
      if(evt.target.name === "increment"){
        setPquantity(pquantity+1);
      } else if(evt.target.name === "decrement"){
        if(pquantity !== 1){
          setPquantity(pquantity-1);
        }
      }  
    }
  }
  const sendCartDetails = async (evt,pid) => {
    const ccdata = {
      'qty': pquantity,
      'pid': pid
    }
    dispatch(addToCart(ccdata));
  }
  
  if(product?.warningMsg.length > 0 && product?.warningMsg == "Added To Cart"){
    toast.success(product?.warningMsg + " !", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'success1',
    });
  } else if (product?.warningMsg.length > 0 && product?.warningMsg == "Already this product is present in you cart"){
    toast.error(product?.warningMsg + " !", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'success2',
    });
  }

  return (
    <div>
      {
        product.isLoading == true ? <CLoader /> :
        <div className="container px-5 py-24 mx-auto">
          <ToastContainer />
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="{productsDetails?.p_name}" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={(productImages) ? productImages[0]?.pimages : ""} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <Button className="float-right" variant="contained" onClick={() => history.goBack()}>Back</Button>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">DBC's Fast Food</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productsDetails?.p_name}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{productsDetails?.p_description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <button name="decrement" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(event)=>handleQuantityCount(event)}>-</button>&nbsp;&nbsp;
                  <input type="text" size={2} className="shadow appearance-none border border-red-500" readOnly value={(productsDetails?.available == "Active") ? pquantity : 0} style={{textAlign:'center'}}/>&nbsp;&nbsp;
                  <button name="increment" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={(event)=>handleQuantityCount(event)}>+</button>
                </div>
                <div className="flex ml-6 items-center">
                  {/* <span className="mr-3">Size</span> */}
                  <div className="relative">
                    {
                      (product?.isCartLoading == false) ? 
                        <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={(event)=>sendCartDetails(event,productsDetails?.id)}>
                          Add to Cart
                        </button> : 
                        <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
                          Loading ...
                        </button>
                    }
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">Rs {productsDetails?.p_amt}/-</span>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" title="Add to Favourites">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ProductView;