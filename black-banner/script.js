// Global variables
let cart = [];
let products = [];
let currentCategory = 'All';

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');
const contactForm = document.getElementById('contact-form');
const productGrid = document.getElementById('product-grid');

// Categories will be populated from products.json
let categories = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load products
    loadProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Load cart from localStorage
    loadCartFromStorage();
    
    // Setup smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Initialize page routing
    initializeRouting();
}

// Product Management
function getRandomPrice(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

async function loadProducts() {
    showLoadingIndicator();
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        products = data.categories.flatMap(category => 
            category.products.map(product => ({
                ...product,
                category: category.name
            }))
        );

        categories = [...new Set(products.map(p => p.category))];

        hideLoadingIndicator();
        renderCategoryFilters();
        renderProducts();
        showNotification(`Successfully loaded ${products.length} products from ${categories.length} categories!`);
    } catch (error) {
        console.error('Failed to load products:', error);
        hideLoadingIndicator();
        // Display a more user-friendly error message on the page
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
            productGrid.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
        }
        showNotification('Error: Could not load products.', 'error');
    }
}

function renderCategoryFilters() {
    const container = document.querySelector('#products .container');
    if (!container) return;

    let filterBar = document.getElementById('category-filters');
    if (!filterBar) {
        filterBar = document.createElement('div');
        filterBar.id = 'category-filters';
        filterBar.className = 'category-filters';
        container.insertBefore(filterBar, productGrid);
    }

    const allCats = ['All', ...categories];
    filterBar.innerHTML = allCats.map(cat => `
        <button class="category-btn${currentCategory === cat ? ' active' : ''}" data-category="${cat}">${cat}</button>
    `).join('');

    filterBar.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.getAttribute('data-category');
            renderCategoryFilters();
            renderProducts();
        });
    });
}

function renderProducts() {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    const noProductsDiv = document.getElementById('no-products');

    const visibleProducts = currentCategory === 'All'
        ? products
        : products.filter(p => p.category === currentCategory);
    
    if (visibleProducts.length === 0) {
        if (noProductsDiv) {
            noProductsDiv.style.display = 'block';
        }
        return;
    } else {
        if (noProductsDiv) {
            noProductsDiv.style.display = 'none';
        }
    }
    
    visibleProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productGrid.appendChild(productCard);
    });
    
    // Update category count in filter buttons
    updateCategoryCount();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-description">${product.description.substring(0, 50)}...</p>
            <p class="product-price">${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

function clearCart() {
    cart = [];
    updateCartUI();
    saveCartToStorage();
    showNotification('Cart cleared!');
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart modal
    renderCartItems();
    updateCartTotal();
}

function renderCartItems() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="background: #f5f5f5; border: none; padding: 5px 10px; margin: 0 5px; border-radius: 3px; cursor: pointer;">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="background: #f5f5f5; border: none; padding: 5px 10px; margin: 0 5px; border-radius: 3px; cursor: pointer;">+</button>
                <button onclick="removeFromCart(${item.id})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; margin-left: 10px; border-radius: 3px; cursor: pointer;">Remove</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

// Local Storage
function saveCartToStorage() {
    localStorage.setItem('blackbanner_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('blackbanner_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Cart modal
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
        });
    }
    
    if (cartModal) {
        // Close modal when clicking outside
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
        
        // Close button
        const closeBtn = cartModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCartModal);
        }
    }
    
    // Cart actions
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Modal Functions
function openCartModal() {
    if (cartModal) {
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        renderCartItems();
        updateCartTotal();
    }
}

function closeCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Form Handling
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        e.target.reset();
        showNotification('Message sent successfully!');
    }, 2000);
}

// Checkout
function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simulate checkout process
    checkoutBtn.innerHTML = '<span class="loading"></span> Processing...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        clearCart();
        closeCartModal();
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.disabled = false;
        showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`);
    }, 3000);
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add fade-in class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Simple routing system
function initializeRouting() {
    // Handle hash changes
    window.addEventListener('hashchange', handleRouteChange);
    
    // Handle initial load
    handleRouteChange();
}

function handleRouteChange() {
    const hash = window.location.hash || '#home';
    const targetSection = document.querySelector(hash);
    
    if (targetSection) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current nav link
        const activeLink = document.querySelector(`a[href="${hash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Scroll to section if not already visible
        if (!isElementInViewport(targetSection)) {
            setTimeout(() => {
                scrollToSection(targetSection.id);
            }, 100);
        }
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(handleNavbarScroll, 10);
window.removeEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', debouncedScroll);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here in a production environment
        console.log('Service Worker support detected');
    });
}

// Loading indicator functions
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Update category count in filter buttons
function updateCategoryCount() {
    const filterButtons = document.querySelectorAll('.category-btn');
    filterButtons.forEach(btn => {
        const category = btn.getAttribute('data-category');
        let count;
        if (category === 'All') {
            count = products.length;
        } else {
            count = products.filter(p => p.category === category).length;
        }
        
        // Update button text to include count
        const originalText = btn.textContent.split(' (')[0];
        btn.textContent = `${originalText} (${count})`;
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
