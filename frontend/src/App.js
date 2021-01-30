import React from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeView from './view/HomeView';

import './styles/App.css';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="homeview-container">
          <div className="homeview-display">
            <HomeView />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
