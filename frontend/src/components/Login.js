import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLoginProcess } from "../actions/user";
import * as constants from "../actions/types";
import SimpleReactValidator from 'simple-react-validator';
import { isLoggedIn } from './../utils/helper';
import { Redirect } from 'react-router';

const Login = (props) => {
  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

  const {email,password} = formData;
  const simpleValidator = useRef(new SimpleReactValidator({
    className: 'text-danger',
  }));
  const [, forceUpdate] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.name]: e.target.value});
  };
  
  const dispatch = useDispatch();
  const { showToast } = useSelector(state => state.userRegister);
  const userAuthData = useSelector(state => state.userLogin);
  console.log(userAuthData);
  useEffect(() => {
  if(showToast){
    toast.success("Registration Success !", {
      position: toast.POSITION.TOP_CENTER
    });
    dispatch({
      type: constants.REGISTER_CLEAR
    });
  }
  }, [dispatch, showToast]);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginformValid = simpleValidator.current.allValid();
    if (!loginformValid) {
        simpleValidator.current.showMessages()
        forceUpdate(1)
    } else {
        dispatch(userLoginProcess(formData));
    }
  }
  const userTempData = (userAuthData) ? JSON.parse(userAuthData.userDetails) :  JSON.parse(localStorage.getItem('userDetails'));
  if((isLoggedIn() || userAuthData?.isAuthenticated) && userTempData?.user_type == "user"){
    return <Redirect to="/user-dashboard" />;
  } else if((isLoggedIn() || userAuthData?.isAuthenticated) && userTempData?.user_type == "admin"){
    return <Redirect to="admin/dashboard" />;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <ToastContainer />
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">DBC Login</h1>  
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={(e)=>handleLogin(e)}>
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input type="text" name="email" value={email} onChange={(e)=>handleChange(e)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                {simpleValidator.current.message('Email ', formData.email, 'required')}
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>handleChange(e)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                {simpleValidator.current.message('Password ', formData.password, 'required')}
                <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                    <span className="inline-block mr-2">Login</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
              </div>
            </form>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <span className="inline-block ml-1">Forgot Password</span>
                  </button>
                </div>
                <div className="text-center sm:text-right  whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <Link to="register" className="inline-block ml-1">Sign Up</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <Link to="/" className="inline-block ml-1">Back to Home</Link>
                  </button>
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}
export default Login