import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../utils/helper";
import NotFound from "../../components/NotFound";
const AdminRoutes = ({ component: Component, ...rest }) => {
  const udData = useSelector(state => state.userLogin);
  const uddDate = (JSON.parse(udData.userDetails)) ? JSON.parse(udData.userDetails) : JSON.parse(localStorage.getItem('userDetails')) ;
  if(uddDate?.user_type === "admin"){
    return <Route {...rest} render={(props) => ((isLoggedIn() || udData?.isAuthenticated) ?  <Component {...props} /> : <Redirect to="/login" />)} />; 
  } else {
    return <Route component={NotFound}/>; 
  }
};

export default AdminRoutes;