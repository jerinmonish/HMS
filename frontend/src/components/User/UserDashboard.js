import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../utils/helper";
import { Redirect } from 'react-router';
import { listAllCategory } from "../../actions/products";
import * as constants from "../../actions/types";
import { useSelector,useDispatch } from "react-redux";
import CLoader from "../Layouts/CLoader";

const UserDashboard = (props) => {
  const dispatch = useDispatch();
  const catData = useSelector(state => state.productsApi);

  const loginData = useSelector(state => state.userLogin);
  
  useEffect(()=>{
      dispatch(listAllCategory(loginData.token))
  },[]);

  const pcategory = (catData?.categoryData?.data === undefined) ? [] : catData?.categoryData?.data;
  return (
    <div>
      {
        catData.isLoading == true ? <CLoader /> :
        <div className="container w-full mx-auto my-16 text-center bg-white">
          <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 text-center">Our Categories</h2>
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {pcategory && pcategory.map((pcategory) => (
                  <div key={pcategory.id} className="group relative">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <img src={pcategory.imageSrc} alt={pcategory.imageAlt} className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
                    </div>
                    <div className="mt-4">
                      <div>
                        <h3 className="text-sm text-gray-700 text-center">
                        <Link to={`/category-product/${btoa(pcategory.id)}`}>
                          <span aria-hidden="true" className="absolute inset-0"/> {pcategory.name}
                        </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default UserDashboard;
