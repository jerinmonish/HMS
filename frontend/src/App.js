import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { browserHistory } from 'react-router';
import { useSelector } from "react-redux";
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
import NotFound from "./components/NotFound";
import AdminNavbar from "./components/admin/Layouts/AdminNavbar";
import AdminFooter from "./components/admin/Layouts/AdminFooter";
import Admindashboard from "./components/admin/Admindashboard";
import ListProducts from "./components/admin/Products/ListProducts";
import AddProduct from "./components/admin/Products/AddProduct";
import { Redirect } from "react-router-dom";
import PrivateRoutes from "./actions/routes/PrivateRoutes";
import AdminRoutes from "./actions/routes/AdminRoutes";
import MyOrders from "./components/MyOrders";

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
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        {/* <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' /> */}
        <AdminRoutes path='/admin/:path?' exact>
          <AdminNavbar className="bg-gray-100 font-sans leading-normal tracking-normal"/>
            <Switch>
              <AdminRoutes path='/admin/dashboard' component={Admindashboard} />
              <AdminRoutes path='/admin/product' component={ListProducts} />
              <AdminRoutes path='/admin/add-product' component={AddProduct} />
              {/* <Route component={NotFound}/> */}
            </Switch>
          <AdminFooter />
        </AdminRoutes>
        
        <Route>
          <AuthNavbar />
            <Switch>
              <PrivateRoutes path="/user-dashboard" component={UserDashboard} />
              <PrivateRoutes path="/my-orders" component={MyOrders} />
              <PrivateRoutes path="/sign-out" component={Logout} />
              <PrivateRoutes path="/category-product/:id?" component={ProductByCategory} />
              <PrivateRoutes path="/view-product/:id?" component={ProductView} />
              <PrivateRoutes path="/my-cart" component={MyCart} />
              <Route component={NotFound}/>
            </Switch>
          <AuthFooter />
        </Route>

      <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
