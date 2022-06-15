import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../utils/helper";
// import { userLoginProcess } from "../../actions/user";
import NotFound from "../../components/NotFound";
const PrivateRoutes = ({ component: Component, ...rest }) => {
  // const { isAuthenticated/*, isLoading*/ } = useSelector(state => state.userLogin);
  const udData = useSelector(state => state.userLogin);
  const uddDate = (JSON.parse(udData.userDetails)) ? JSON.parse(udData.userDetails) : JSON.parse(localStorage.getItem('userDetails')) ;
  if(uddDate?.user_type == "user"){
    return <Route {...rest} render={(props) => ((isLoggedIn() || udData?.isAuthenticated) ?  <Component {...props} /> : <Redirect to="/login" />)} />; 
  } else {
    return <Route component={NotFound}/>; 
  }
};

export default PrivateRoutes;