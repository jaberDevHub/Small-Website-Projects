import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import Products from './components/Products';
import Cart from './components/Cart';
import Footer from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="App">
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <section id="home"><Hero /></section>
      <section id="collection"><Products addToCart={addToCart} /></section>
      <section id="cart"><Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /></section>
      <section id="about"><BrandStory /></section>
      <section id="contact"><Footer /></section>
    </div>
  );
}