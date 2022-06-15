import React, { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {getMyOrders} from './../actions/products';
import CLoader from "./Layouts/CLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "@material-ui/lab/Pagination";

const MyOrders = () => {
  const dispatch = useDispatch();
  const OrderData = useSelector(state => state.productsApi);

  const changePage = (evt,val) => {
    let fData = {
      'selected':val
    }
    dispatch(getMyOrders(fData));
  }

  const products = (OrderData?.myOrderData?.data?.data === undefined) ? [] : OrderData?.myOrderData?.data?.data;
  useEffect(()=>{
    dispatch(getMyOrders());
  },[]);
  return (
  <>
  <div className="container mx-auto" style={{marginTop:'20px'}}>
    {
      (products.isLoading === true) ? <CLoader /> :
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {
            (products?.length <= 0 || products?.length === undefined) ? <img src="https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png"/>: 
              products.map((product ,i) => {
                return (
                  <div className="max-w-sm rounded overflow-hidden shadow-lg" key={i}>
                    <img className="w-full" src={product.product_images.img} alt="" loading="lazy"/>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        <Link to={`/view-product/${btoa(product.pid)}`}>{product.product_name}</Link>
                      </div>
                      <p className="text-gray-700 text-base float-right">Rs {product.single_price} /-</p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" title="No Of Quantities">#{product.no_of_qty}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" title="Total Price">#{product.sp_total_price}</span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" title="Ordered On">#{product.ordered_at}</span>
                    </div>
                    <center>
                      <button className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">Re-Order</button>
                    </center>
                  </div>
                  )
              })
          }
        </div>
    }
    <div style={{display:'flex',alignItems: 'center',justifyContent: 'center',marginTop:'10px'}}>
        <Pagination 
          count={OrderData?.myOrderData?.data?.last_page || 1} 
          page={OrderData?.myOrderData?.data?.current_page || 1} 
          onChange={changePage}
          color="primary"
        />
      </div>
  </div>
  </>
  )
}

export default MyOrders