import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Products />
      <Cart />
      <Footer />
    </div>
  );
}

export default App;