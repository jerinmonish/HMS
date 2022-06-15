import React, { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import {listCatByProduct} from "../actions/products";
import CLoader from "./Layouts/CLoader";
import Pagination from "@material-ui/lab/Pagination";
import CartData from "./Layouts/CartData";
import { Link } from "react-router-dom";

const ProductByCategory = (props) => {
  const dispatch = useDispatch();
  const pData = useSelector(state => state.productsApi);
  useEffect(()=>{
    const fData = {
      'id':atob(props?.match?.params?.id)
    }
    dispatch(listCatByProduct(fData));
  },[]);

  const changePage = (evt,val) => {
    let fData = {
      'id':atob(props?.match?.params?.id),
      'selected':val
    }
    dispatch(listCatByProduct(fData));
  }
  const products = (pData?.productsData?.data?.data === undefined) ? [] : pData?.productsData?.data?.data;
  
  const [toggleModal, settoggleModal] = useState({'cartpp':false,'loadersamp':false,'pid':false});
  const handleCart = (pid) => {
    settoggleModal({'cartpp':true,'loadersamp':true,'pid':pid});
  }

  var addToCart = {
    settoggleModal,
    toggleModal
  }
  
  return (
    <div className="container mx-auto" style={{marginTop:'20px'}}>
      {(toggleModal.cartpp) && <CartData cartDetails={addToCart}/> }
      {
        pData.isLoading == true ? <CLoader /> :
          <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {
              (products?.length <= 0 || products?.length === undefined) ? <img src="https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png"/>: 
                products.map((product ,i) => {
                  return (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg" key={i}>
                      <img className="w-full" src={product?.pimage?.img} alt={product.pname} loading="lazy"/>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                        <Link to={`/view-product/${btoa(product.id)}`}>{product.pname}</Link>
                        </div>
                        <p className="text-gray-700 text-base float-right">Rs {product.p_amt} /-</p>
                        <p className="text-gray-700 text-base float-left">{product.pdesc} </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                      </div>
                      <center>
                        <button className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={() => handleCart(product.id)}>Add to Cart</button>
                      </center>

                    </div>
                  )
                }
                )
            }
      </div>
    }
      <div style={{display:'flex',alignItems: 'center',justifyContent: 'center',marginTop:'10px'}}>
        <Pagination 
          count={pData?.productsData?.data?.last_page || 1} 
          page={pData?.productsData?.data?.current_page || 1} 
          onChange={changePage}
          color="primary"
        />
      </div>
    </div>
  )
}

export default ProductByCategory;