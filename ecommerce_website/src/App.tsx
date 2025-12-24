import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Products />
      <Cart />
    </div>
  );
}

export default App;