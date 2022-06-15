import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "../actions/types";

const initialState = {
  isLoading:false,
  isAuthenticated:false,
  token:null,
  error:"",
  success:"",
  isLogout:false,
  userDetails:null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:false,
        success:"",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:true,
        token:action.returnLoginData,
        userDetails:action.returnUserData,
        success:"login success",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        error:"login error",
        success:"",
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:false,
        success:"",
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        token:"",
        success:"",
        isLogout:true
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        error:"login error",
        success:"",
      };
    default:
      return state;
  }
}
