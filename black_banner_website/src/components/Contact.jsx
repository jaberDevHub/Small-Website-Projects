import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Visit Our Store</h3>
              <p>123 Fashion Street<br />New York, NY 10001</p>
            </div>
            <div className="contact-item">
              <h3>Contact Us</h3>
              <p>Email: info@blackbanner.com<br />Phone: (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Facebook</a>
              </div>
            </div>
          </div>
          <form className="contact-form" id="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
