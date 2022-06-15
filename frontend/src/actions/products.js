import axios from "axios";
import * as constants from "../actions/types"

//To list all the category
export const listAllCategory = (token) => async (dispatch) => {
  dispatch({
    type: constants.PRODUCT_REQUEST
  });
  const tmpToken = (token) ? token : localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.get('/api/v1/get-all-category',{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.PRODUCT_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//To get products based on category id given
export const listCatByProduct = (fData) => async (dispatch) => {
  dispatch({
    type: constants.CAT_PRODUCT_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }
  try {
    await axios.post(`/api/v1/get-cat-based-products?page=${(fData?.selected) ? fData?.selected : '0'}`,fData,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.CAT_PRODUCT_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.CAT_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//To view a product based on product id
export const viewProduct = (pid) => async (dispatch) => {
  dispatch({
    type: constants.VIEW_PRODUCT_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.post(`/api/v1/view-product`,pid,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.VIEW_PRODUCT_SUCCESS,
        payload: res.data
      });
      //This Dispatch is to fix the cart added msg
      dispatch({
        type: constants.CART_PRODUCT_ERROR,
        payload:null,
        warningMsg:""
      });
    });
  } catch (error) {
    dispatch({
      type: constants.VIEW_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//Add Products to Cart Table
export const addToCart = (cdata) => async (dispatch) => {
  dispatch({
    type: constants.CART_PRODUCT_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.post(`/api/v1/add-to-cart`,cdata,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.CART_PRODUCT_SUCCESS,
        payload: res.data.message
      });
    });
  } catch (error) {
    dispatch({
      type: constants.CART_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//Get Cart Details
export const getAllCart = () => async (dispatch) => {
  dispatch({
    type:constants.VIEW_CART_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try{
    await axios.get(`/api/v1/view-cart`,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.VIEW_CART_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.VIEW_CART_ERROR
    });
    console.log(error.response);
  }
}

//Get Cart Details
export const getMyOrders = (gparams) => async (dispatch) => {
  dispatch({
    type:constants.LIST_MY_ORDERS_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try{
    await axios.post(`/api/v1/my-orders?page=${(gparams?.selected) ? gparams?.selected : '0'}`,gparams,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.LIST_MY_ORDERS_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.LIST_MY_ORDERS_ERROR
    });
    console.log(error.response);
  }
}


//Delete Cart Details
export const deleteCartItem = (ciddel) => async (dispatch) => {
  dispatch({
    type:constants.DELETE_CART_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try{
    await axios.post(`/api/v1/delete-cart-item`,ciddel,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.DELETE_CART_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.DELETE_CART_ERROR
    });
    console.log(error.response);
  }
}

//Payment using Card
export const paymentUsingCard = (carddetails) => async (dispatch) => {
  dispatch({
    type:constants.PAYMENT_CARD_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try{
    await axios.post(`/api/v1/payment`,carddetails,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.PAYMENT_CARD_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.PAYMENT_CARD_ERROR
    });
    console.log(error.response);
  }
}

export const getAddCartData = (pid) => async (dispatch) => {
  dispatch({
    type: constants.CART_PRODUCT_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }
  try {
    await axios.post(`/api/v1/add-get-cart-details`,pid,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.CART_PRODUCT_SUCCESS,
        payload: res.data
      });
    });
  } catch (error) {
    dispatch({
      type: constants.CART_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}

//Add Products to table
export const adminAddProduct = (cdata, history) => async (dispatch) => {
  dispatch({
    type: constants.ADD_PRODUCT_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.post(`/api/v1/add-product`,cdata,{headers: headers})
    .then((res)=>{
      dispatch({
        type: constants.ADD_PRODUCT_SUCCESS,
        payload: res.data.message
      });
      history.push('/admin/product');
    });
  } catch (error) {
    dispatch({
      type: constants.ADD_PRODUCT_ERROR
    });
    console.log(error.response);
  }
}