import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import Products from './components/Products';
import Cart from './components/Cart';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <BrandStory />
      <Products />
      <Cart />
      <Footer />
    </div>
  );
}