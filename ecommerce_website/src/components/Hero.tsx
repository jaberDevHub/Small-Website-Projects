import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our E-Commerce Store</h1>
        <p className="text-lg mb-8">Discover amazing products at great prices.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded">Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;