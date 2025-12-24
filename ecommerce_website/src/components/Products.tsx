import React from 'react';

const Products = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    { id: 3, name: 'Product 3', price: '$30' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-lg">{product.price}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;