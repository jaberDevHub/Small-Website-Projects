import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">BLACK BANNER</h1>
        <p className="hero-subtitle">Premium Streetwear Collection</p>
        <p className="hero-description">Elevate your style with our exclusive range of premium clothing designed for the modern individual.</p>
        <button className="cta-button" onClick={() => scrollToSection('products')}>Shop Now</button>
      </div>
      <div className="hero-image">
        <div className="placeholder-image">
          <span>Hero Image</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
