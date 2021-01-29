import React from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeView from './view/HomeView';

import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container className="main-header">
          <div className="header-title">
            <h1>Welcome to MERNShop</h1>
          </div>
        </Container>
        <Container className="homeview-container">
          <div className="homeview-display">
            <HomeView />
          </div>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
