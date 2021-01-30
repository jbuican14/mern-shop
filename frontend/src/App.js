import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeView from './view/HomeView';
import ProductView from './view/ProductView';

import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <div className="homeview-container">
          <div className="homeview-display">
            <Route exact path="/" component={HomeView} />
            <Route path="/product/:id" component={ProductView} />
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
