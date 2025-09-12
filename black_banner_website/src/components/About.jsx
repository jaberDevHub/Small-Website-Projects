import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About BLACK BANNER</h2>
            <p>BLACK BANNER represents the pinnacle of contemporary streetwear fashion. Founded with a vision to create clothing that speaks to the bold and the fearless, we craft each piece with meticulous attention to detail and uncompromising quality.</p>
            <p>Our brand stands for authenticity, rebellion, and self-expression. Every garment tells a story of craftsmanship and innovation, designed for those who dare to stand out from the crowd.</p>
            <div className="features">
              <div className="feature">
                <h3>Premium Quality</h3>
                <p>Only the finest materials and construction techniques</p>
              </div>
              <div className="feature">
                <h3>Unique Designs</h3>
                <p>Exclusive patterns and cuts you won't find anywhere else</p>
              </div>
              <div className="feature">
                <h3>Sustainable</h3>
                <p>Environmentally conscious production processes</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="placeholder-image">
              <span>About Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
