import React, { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {getAllCart} from './../actions/products';
import CLoader from "./Layouts/CLoader";
import {deleteCartItem} from './../actions/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import {paymentUsingCard} from './../actions/products';
const MyCart = () => {
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({
    mobileNo: "",
    cardNo: "",
    userName: "",
    month: "",
    year: "",
    cvvNo: "",
    address:"",
    instructions:""
  });
  
  const simpleValidator = useRef(new SimpleReactValidator({
    className: 'text-danger',
  }));
  const [, forceUpdate] = useState();

  var yr = new Date().getFullYear();
  const mnt = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const {mobileNo,cardNo,userName,month,year,cvvNo,address,instructions} = formData;
  const product = useSelector(state => state.productsApi);
  useEffect(()=>{
    dispatch(getAllCart());
  },[]);

  useEffect(()=>{
    if(product?.cartData?.status){
      dispatch(getAllCart());
      toast.success("Deleted from Cart", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'deletesuccess1',
      });
    } else {
      toast.error("Unable to Delete Cart Item", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'deleteerror1',
      });
    }
  },[product?.cartData?.status]);

  useEffect(()=>{
    if(product?.paymentData?.message == "Payment Success"){
      alert("Payment Success");
    } else {
      toast.error(product?.paymentData?.message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: 'paymentError1',
      });
    }
  },[product?.paymentData?.message]);

  const cart = (product?.cartData?.data === undefined) ? [] : product?.cartData?.data;

  const handleRemoveCartItem = (pid) => {
    const cid = {
      'cid' : pid
    }
    dispatch(deleteCartItem(cid));
  }

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  }
  const handlePayment = (frm) => {
    frm.preventDefault();
    console.log(formData);
    const frmPaymentSubmit = simpleValidator.current.allValid();
    if(!frmPaymentSubmit) {
      simpleValidator.current.showMessages()
      forceUpdate(1)
    } else {
      dispatch(paymentUsingCard(formData));
    }
  }

  return (
    <>
    {
        (product.isLoading === true) ? <CLoader /> :

        <div className="flex justify-center my-6">
          <ToastContainer />
        <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
          <h1 className="text-3xl md:text-4xl font-medium mb-2 text-center">Cart Summary</h1>
          <hr />
          <div className="flex-1">
            <table className="w-full text-sm lg:text-base" cellSpacing="0">
              <thead>
                <tr className="h-12 uppercase">
                  <th className="hidden md:table-cell"></th>
                  <th className="text-left">Product</th>
                  <th className="lg:text-right text-left pl-5 lg:pl-0">
                    <span className="lg:hidden" title="Quantity">Qtd</span>
                    <span className="hidden lg:inline">Quantity</span>
                  </th>
                  <th className="hidden text-right md:table-cell">Unit price</th>
                  <th className="text-right">Total price</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart && cart.map((cart ,i) => {
                      return (
                        <tr key={i}>
                          <td className="hidden pb-4 md:table-cell">
                            <Link to={`/view-product/${btoa(cart.pid)}`}>
                              <img src={cart.product_images.img} className="w-20 rounded" alt="Thumbnail" />
                            </Link>
                          </td>
                          <td>
                           <Link to={`/view-product/${btoa(cart.pid)}`}>
                              <p className="mb-2 md:ml-4">{cart.product_name}</p>
                            </Link>
                          </td>
                          <td className="justify-center md:justify-end md:flex mt-6">
                            <div className="w-20 h-10">
                              <div className="relative flex flex-row w-full h-8">
                                <span className="text-sm lg:text-base font-medium">
                                  {cart.no_of_qty}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="hidden text-right md:table-cell">
                            <span className="text-sm lg:text-base font-medium">
                              Rs {cart.single_price}/-
                            </span>
                          </td>
                          <td className="text-right">
                            <span className="text-sm lg:text-base font-medium">
                              Rs {cart.sp_total_price}/-
                            </span>
                          </td>
                          <td className="float-right">
                            <span title="Delete Item" onClick={() => {if(window.confirm('Are you sure to delete this item from cart ?')){ handleRemoveCartItem(btoa(cart.id))};}}>
                              <svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" className="w-4 text-red-600 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"/></svg>
                            </span>
                          </td>
                        </tr>
                      )
                    }
                  )
                }
              </tbody>
            </table>
            <hr className="pb-6 mt-6" />
            {
              (cart?.length > 0) ? 
            <form onSubmit={(e)=>handlePayment(e)}>
            <div className="my-4 mt-6 -mx-2 lg:flex">
              <div className="lg:px-2 lg:w-1/2">
                {/* <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Coupon Code</h1>
                </div>
                <div className="p-4">
                  <p className="mb-4 italic">If you have a coupon code, please enter it in the box below</p>
                  <div className="justify-center md:flex">
                    <form action="" method="POST">
                        <div className="flex items-center w-full h-13 pl-3 bg-white bg-gray-100 border rounded-full">
                          <input type="coupon" name="code" id="coupon" placeholder="Apply coupon" defaultValue="90off"
                                  className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"/>
                            <button type="submit" className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none">
                              <svg aria-hidden="true" data-prefix="fas" data-icon="gift" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"/></svg>
                              <span className="font-medium">Apply coupon</span>
                            </button>
                        </div>
                    </form>
                  </div>
                </div> */}
                <div className="p-4 mt-6 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Instruction for seller</h1>
                </div>
                <div className="p-4">
                  <p className="mb-4 italic">If you have some information for the seller you can leave them in the box below</p>
                  <textarea name="instructions" value={instructions} onChange={(e) => handleChange(e)} className="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
                </div>
              </div>
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">User &amp; Card Details</h1>
                </div>
                <div className="p-4">
                  <div className="relative pb-5">
                    <input type="text" name="mobileNo" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Mobile Number*" value={mobileNo} onChange={(e)=>handleChange(e)}/>
                    {simpleValidator.current.message('Mobile Number ', formData.mobileNo, 'required')}
                  </div>
                  <div className="relative pb-5">
                    <input type="text" name="cardNo" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Card Number*" value={cardNo} onChange={(e)=>handleChange(e)}/>
                    {simpleValidator.current.message('Card Number ', formData.cardNo, 'required')}
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-2">
                    <input type="text" name="userName" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Name*" value={userName} onChange={(e)=>handleChange(e)}/>
                    {simpleValidator.current.message('Name ', formData.cardNo, 'required')}
                    <select name="month" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" onChange={(e)=>handleChange(e)}>
                      <option value={""}>Choose Month*</option>
                      {mnt.map((item, key) => (
                        <option key={key} value={key+1}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {simpleValidator.current.message('Expiry Month', formData.month, 'required')}
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-2">
                    <select name="year" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" onChange={(e)=>handleChange(e)}>
                      <option alue={""}>Choose Year*</option>
                      {
                       (
                        Array.from( new Array(20), (v,i) =>
                          <option key={i} value={yr+i}>{yr+i}</option>
                        )
                      )
                     }
                    </select>
                    {simpleValidator.current.message('Expiry Year', formData.year, 'required')}
                    <input type="text" name="cvvNo" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="CVV*" value={cvvNo} onChange={(e)=>handleChange(e)}/>
                    {simpleValidator.current.message('CVV Number', formData.cvvNo, 'required')}
                  </div>
                  <div className="p-4">
                    <textarea className="w-full h-24 p-2 bg-gray-100 rounded" name="address" placeholder="Address To Deliver*" value={address} onChange={(e)=>handleChange(e)}></textarea>
                    {simpleValidator.current.message('Delivery Address', formData.address, 'required')}
                  </div>
                  
                  {/* <p className="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p> */}
                    {/* <div className="flex justify-between border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Subtotal
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        148,827.53€
                      </div>
                    </div>
                      <div className="flex justify-between pt-4 border-b">
                        <div className="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                          <form action="" method="POST">
                            <button type="submit" className="mr-2 mt-1 lg:mt-2">
                              <svg aria-hidden="true" data-prefix="far" data-icon="trash-alt" className="w-4 text-red-600 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"/></svg>
                            </button>
                          </form>
                          Coupon "90off"
                        </div>
                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700">
                          -133,944.77€
                        </div>
                      </div>
                      <div className="flex justify-between pt-4 border-b">
                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                          New Subtotal
                        </div>
                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                          14,882.75€
                        </div>
                      </div>
                      <div className="flex justify-between pt-4 border-b">
                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                          Tax
                        </div>
                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                          2,976.55€
                        </div>
                      </div> */}
                      <div className="flex justify-between pt-4 border-b">
                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                          Total
                        </div>
                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                         Rs {product?.cartData?.amt} /-
                        </div>
                      </div>
                      {
                        (product.paymentLoading === true) ? <iframe src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" width="480" height="480" frameBorder="0" className="giphy-embed" allowFullScreen></iframe> : 
                        <button type="submit" className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                        <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                        <span className="ml-2 mt-5px">Pay</span>
                      </button>
                      }
                </div>
              </div>
            </div>
            </form>
            : <h1 className="text-3xl md:text-4xl font-medium mb-2 text-center">No Cart Data ...</h1>
            }
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default MyCart