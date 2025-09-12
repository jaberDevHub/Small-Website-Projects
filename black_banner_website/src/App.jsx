import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="App">
      <Navbar setCartOpen={setCartOpen} />
      <Hero />
      <Products />
      <About />
      <Contact />
      <Footer />
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </div>
  );
}

export default App;
