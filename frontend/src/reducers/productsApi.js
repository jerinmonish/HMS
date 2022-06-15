import * as constants from "../actions/types";

const initialState = {
  isLoading:false,
  productsData:null,
  vproductsData:null,
  categoryData:null,
  error:"",
  success:"",
  warningMsg:"",
  isCartLoading:false,
  cartData:null,
  paymentData:null,
  paymentLoading:false,
  myOrderData:null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success:"",
      };
    case constants.PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryData:action.payload,
        success:"success",
      };
    case constants.PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        categoryData:null,
        error:"error",
      };
    case constants.VIEW_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success:"",
      };
    case constants.VIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vproductsData:action.payload,
        success:"success",
      };
    case constants.VIEW_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        vproductsData:null,
        error:"error",
      };
    case constants.CAT_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success:"",
      };
    case constants.CAT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productsData:action.payload,
        success:"success",
      };
    case constants.CAT_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        productsData:null,
        error:"error",
      };
    case constants.CART_PRODUCT_REQUEST:
      return {
        ...state,
        isCartLoading: true,
        success:"",
        warningMsg:""
      };
    case constants.CART_PRODUCT_SUCCESS:
      return {
        ...state,
        isCartLoading: false,
        success:"success",
        warningMsg:action.payload
      };
    case constants.CART_PRODUCT_ERROR:
      return {
        ...state,
        isCartLoading: false,
        error:"error",
        warningMsg:""
      };
    case constants.VIEW_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        success:"",
        cartData:null
      };
    case constants.VIEW_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success:"success",
        cartData:action.payload
      };
    case constants.VIEW_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error:"error",
        cartData:null
      };
    case constants.LIST_MY_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        success:"",
        myOrderData:null
      };
    case constants.LIST_MY_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success:"success",
        myOrderData:action.payload
      };
    case constants.LIST_MY_ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error:"error",
        myOrderData:null
      };
    case constants.DELETE_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        success:"",
        cartData:null
      };
    case constants.DELETE_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success:"success",
        cartData:action.payload
      };
    case constants.DELETE_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error:"error",
      };
    case constants.PAYMENT_CARD_REQUEST:
      return {
        ...state,
        paymentLoading: true,
        success:"",
        paymentData:null
      };
    case constants.PAYMENT_CARD_SUCCESS:
      return {
        ...state,
        paymentLoading: false,
        success:"success",
        paymentData:action.payload
      };
    case constants.PAYMENT_CARD_ERROR:
      return {
        ...state,
        paymentLoading: false,
        error:"error",
      };
    case constants.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        adminAddProduct: true,
      };
    case constants.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        adminAddProduct: false,
        success:"success",
      };
    case constants.ADD_PRODUCT_ERROR:
      return {
        ...state,
        adminAddProduct: false,
        error:"error",
      };
    default:
      return state;
  }
}
