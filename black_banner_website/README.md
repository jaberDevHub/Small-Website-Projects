# BLACK BANNER - Premium Clothing Brand Website

A modern, minimal, and fully functional e-commerce website for a premium streetwear clothing brand. Built with HTML, CSS, JavaScript, and Node.js/Express backend.

## Features

### Frontend
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Minimal UI/UX**: Clean, modern design with smooth animations
- **Single Page Application**: Smooth scrolling navigation between sections
- **Shopping Cart**: Add/remove items, quantity management, local storage persistence
- **Product Catalog**: Dynamic product grid with hover effects
- **Contact Form**: Functional contact form with validation
- **Mobile Menu**: Hamburger menu for mobile navigation
- **Smooth Animations**: Fade-in effects and hover animations
- **Modal System**: Shopping cart modal with backdrop blur

### Backend (Node.js/Express)
- **RESTful API**: Complete API for products, orders, and contact
- **Product Management**: CRUD operations for products
- **Order Processing**: Create and manage orders
- **Contact Form Handler**: Process contact form submissions
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Fonts**: Google Fonts (Inter)
- **Icons**: Custom CSS icons
- **Storage**: LocalStorage for cart persistence

## Project Structure

```
black-banner/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js/Express server
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Features in Detail

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Persistent storage (localStorage)
- Real-time total calculation
- Checkout simulation

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px, 480px
- Hamburger menu for mobile
- Touch-friendly buttons
- Optimized images and layouts

### Performance
- Optimized CSS and JavaScript
- Debounced scroll events
- Lazy loading animations
- Minimal dependencies
- Fast loading times

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## Customization

### Colors
The website uses a minimal black and white color scheme. To customize:
- Primary color: `#000` (black)
- Background: `#fff` (white)
- Gray tones: `#333`, `#666`, `#999`

### Typography
- Primary font: Inter (Google Fonts)
- Fallbacks: System fonts for better performance

### Products
Edit the `sampleProducts` array in `script.js` to add/modify products.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimizations

- CSS Grid and Flexbox for layouts
- Intersection Observer for animations
- Debounced scroll events
- Minimal JavaScript dependencies
- Optimized images (placeholder system)
- Local storage for cart persistence

## Security Features

- Input validation on forms
- XSS protection
- CORS configuration
- Error handling
- Sanitized user inputs

## Future Enhancements

- Payment integration (Stripe, PayPal)
- User authentication
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Admin dashboard
- Database integration (MongoDB, PostgreSQL)
- Image upload and management
- Search and filtering
- SEO optimization

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues, please contact: info@blackbanner.com

---

**BLACK BANNER** - Premium streetwear for the bold and fearless.