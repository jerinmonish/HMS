import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthNavbar from "./components/Layouts/AuthNavbar";
import AuthFooter from "./components/Layouts/AuthFooter";
import UserDashboard from "./components/User/UserDashboard";
import Logout from "./components/User/Logout";
import ProductByCategory from "./components/ProductByCategory";
import ProductView from './components/ProductView';
import MyCart from "./components/MyCart";

import PrivateRoutes from "./actions/routes/PrivateRoutes";

const UnauthenticatedRoutes = () => {
  return (
     <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
     </Switch>
  )
}

const AuthenticatedRoutes = () => {
  return (
     <Switch>
      <AuthNavbar />
        <PrivateRoutes path="/user-dashboard" component={UserDashboard} />
        <PrivateRoutes path="/sign-out" component={Logout} />
        <PrivateRoutes path="/category-product/:id?" component={ProductByCategory} />
        <PrivateRoutes path="/view-product/:id?" component={ProductView} />
        <PrivateRoutes path="/my-cart" component={MyCart} />
      <AuthFooter />
     </Switch>
  )
}

const App = () => {

  return (
    <Switch>
      <Fragment>
        <Route path={['/','/login','/register']} component={UnauthenticatedRoutes}/>
        {/* <Route path={['/user-dashboard','/sign-out','/category-product/:id?','/view-product/:id?','/my-cart']} component={AuthenticatedRoutes}/> */}
        <AuthNavbar />
        <PrivateRoutes path="/user-dashboard" component={UserDashboard} />
        <PrivateRoutes path="/sign-out" component={Logout} />
        <PrivateRoutes path="/category-product/:id?" component={ProductByCategory} />
        <PrivateRoutes path="/view-product/:id?" component={ProductView} />
        <PrivateRoutes path="/my-cart" component={MyCart} />
      <AuthFooter />
      </Fragment>
    </Switch>
  );
}

export default App;
