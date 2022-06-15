import axios from "axios";
import * as constants from "../actions/types"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router';

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
export const userRegistration = (rgData) => async (dispatch) => {
  dispatch({
    type: constants.REGISTER_REQUEST
  });
  try {
    await axios.post('api/signup',rgData,{headers: headers})
    .then((res)=>{
      console.log(res);
      dispatch({
        type: constants.REGISTER_SUCCESS
      });
    });
  } catch (error) {
    dispatch({
      type: constants.REGISTER_ERROR
    });
    //console.log(error.response);
    var tempErr = []
    if(error.response?.data?.errors){
      Object.keys(error.response.data.errors).forEach(function(vals) {
         tempErr.push(error.response.data.errors[vals][0]);
         toast.error(error.response.data.errors[vals][0], {
          position: toast.POSITION.TOP_CENTER
        });
      });
    }
  }
}

export const userLoginProcess = (lgData) => async (dispatch) => {
  dispatch({
    type: constants.LOGIN_REQUEST
  });
  try {
    await axios.post('/api/signin',lgData,{headers: headers})
    .then((lres)=>{
      dispatch({
        type: constants.LOGIN_SUCCESS,
        returnLoginData:lres.data.token,
        returnUserData:JSON.stringify(lres.data.user),
      });
      localStorage.setItem('user_token',lres.data.token);
      localStorage.setItem("userDetails", JSON.stringify({'name':lres.data.user.name,'email':lres.data.user.email,'id':lres.data.user.id,'user_type':lres.data.user.user_type}));
    });
  } catch (error) {
    dispatch({
      type: constants.LOGIN_ERROR
    });
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export const userLogout = (history) => async (dispatch) => {
  dispatch({
    type: constants.LOGOUT_REQUEST
  });
  const tmpToken = localStorage.getItem('user_token');
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${tmpToken}`
  }

  try {
    await axios.post('/api/signout',{'Authorization':'Bearer '+tmpToken},{headers: headers})
    .then((lgres)=> {
      dispatch({
        type: constants.LOGOUT_SUCCESS,
      });
      localStorage.removeItem('user_token');
      localStorage.removeItem('userDetails');
      history.push('/login');
    });
  } catch (error) {
    dispatch({
      type: constants.LOGOUT_ERROR
    });
    console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}