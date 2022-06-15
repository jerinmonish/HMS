import {
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_CLEAR,
  SHOW_TOAST,
} from "../actions/types";

const initialState = {
  isLoading:false,
  isAuthenticated:false,
  token:null,
  error:"",
  success:"",
  showToast:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:false,
        success:"",
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        token:action.returnRegData,
        success:"token generated",
        showToast:true
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        error:"unable to register",
        success:"",
      };
    case REGISTER_CLEAR:
      return {
        ...state,
        isLoading:false,
        isAuthenticated:false,
        token:null,
        error:"",
        success:"",
        showToast:false
      };
    case SHOW_TOAST:
      return {
        ...state,
        showToast: true,
        success:"",
      };
    default:
      return state;
  }
}
