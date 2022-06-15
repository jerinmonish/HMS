import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { userLogout } from "../../actions/user";

const Logout = () => {
  const [formData,setFormData] = useState({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('user_token')
    });

  const dispatch = useDispatch();
  dispatch(userLogout(formData));
}

export default Logout