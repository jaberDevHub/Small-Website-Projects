import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        const allProducts = data.categories.flatMap(category => 
          category.products.map(product => ({...product, category: category.name}))
        );
        setProducts(allProducts);
        setCategories(['All', ...new Set(allProducts.map(p => p.category))]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = currentCategory === 'All'
    ? products
    : products.filter(p => p.category === currentCategory);

  return (
    <section id="products" className="products">
      <div className="container">
        <h2 className="section-title">Our Collection</h2>
        <p className="section-subtitle">Discover our premium range across 10 categories with 100+ products</p>

        <div className="category-filters">
          {categories.map(category => (
            <button 
              key={category} 
              className={`category-btn ${currentCategory === category ? 'active' : ''}`}
              onClick={() => setCurrentCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-indicator" style={{display: 'block'}}>
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="product-grid">
            {visibleProducts.length > 0 ? (
              visibleProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description.substring(0, 50)}...</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <button className="add-to-cart">Add to Cart</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products" style={{display: 'block'}}>
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
