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

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <div className="homeview-container">
          <div className="homeview-display">
            <Route path="/product/:id" component={ProductView} />
            <Route path="/placeorder" component={PlaceOrderView} />
            <Route path="/shipping" component={ShippingView} />
            <Route path="/payment" component={PaymentView} />
            <Route path="/login" component={LoginView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/cart/:id?" component={CartView} />
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
