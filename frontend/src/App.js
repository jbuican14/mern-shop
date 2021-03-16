import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import CartView from './view/CartView';
import HomeView from './view/HomeView';
import ProductView from './view/ProductView';
import LoginView from './view/LoginView';
import RegisterView from './view/RegisterView';

import './styles/App.css';
import ProfileView from './view/ProfileView';
import ShippingView from './view/ShippingView';
import PaymentView from './view/PaymentView';
import PlaceOrderView from './view/PlaceOrderView';
import OrderView from './view/OrderView';
import UserListView from './view/UserListView';
import UserEditByAdminView from './view/UserEditByAdminView';
import ProductListByAdminView from './view/ProductListByAdminView';
import ProductEditByAdminView from './view/ProductEditByAdminView';
import OrderListByAdminView from './view/OrderListByAdminView';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <div className="homeview-container">
          <div className="homeview-display">
            <Route path="/admin/userlist" component={UserListView} />
            <Route
              path="/admin/productlist"
              component={ProductListByAdminView}
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditByAdminView}
            />
            <Route
              path="/admin/user/:id/edit"
              component={UserEditByAdminView}
            />
            <Route path="/admin/orderlist" component={OrderListByAdminView} />
            <Route path="/cart/:id?" component={CartView} />
            <Route path="/login" component={LoginView} />
            <Route path="/order/:id" component={OrderView} />
            <Route path="/payment" component={PaymentView} />
            <Route path="/placeorder" component={PlaceOrderView} />
            <Route path="/product/:id" component={ProductView} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/shipping" component={ShippingView} />
            <Route exact path="/" component={HomeView} />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
};

export default App;
