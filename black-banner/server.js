const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Sample products data (in a real app, this would be in a database)
const products = [
    {
        id: 1,
        name: "Black Hoodie Premium",
        price: 89.99,
        image: "Black Hoodie",
        description: "Premium quality black hoodie with minimalist design",
        category: "hoodies",
        inStock: true,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Minimal T-Shirt",
        price: 39.99,
        image: "White T-Shirt",
        description: "Clean and simple white t-shirt for everyday wear",
        category: "t-shirts",
        inStock: true,
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 3,
        name: "Urban Jacket",
        price: 149.99,
        image: "Urban Jacket",
        description: "Stylish urban jacket perfect for street fashion",
        category: "jackets",
        inStock: true,
        sizes: ["M", "L", "XL"]
    },
    {
        id: 4,
        name: "Classic Jeans",
        price: 79.99,
        image: "Black Jeans",
        description: "Comfortable black jeans with perfect fit",
        category: "jeans",
        inStock: true,
        sizes: ["28", "30", "32", "34", "36"]
    },
    {
        id: 5,
        name: "Streetwear Cap",
        price: 29.99,
        image: "Black Cap",
        description: "Minimalist cap with BLACK BANNER logo",
        category: "accessories",
        inStock: true,
        sizes: ["One Size"]
    },
    {
        id: 6,
        name: "Premium Sneakers",
        price: 199.99,
        image: "Black Sneakers",
        description: "High-quality sneakers for urban lifestyle",
        category: "shoes",
        inStock: true,
        sizes: ["8", "9", "10", "11", "12"]
    }
];

// In-memory storage for orders (in production, use a database)
let orders = [];
let orderIdCounter = 1000;

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;
        let filteredProducts = [...products];

        if (category) {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        if (minPrice) {
            filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
        }

        if (maxPrice) {
            filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
        }

        res.json({
            success: true,
            data: filteredProducts,
            count: filteredProducts.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// Create order
app.post('/api/orders', (req, res) => {
    try {
        const { items, customerInfo, totalAmount } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid order items'
            });
        }

        // Validate products exist and calculate total
        let calculatedTotal = 0;
        const validatedItems = [];

        for (const item of items) {
            const product = products.find(p => p.id === item.id);
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product with ID ${item.id} not found`
                });
            }

            if (!product.inStock) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${product.name} is out of stock`
                });
            }

            const itemTotal = product.price * item.quantity;
            calculatedTotal += itemTotal;

            validatedItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                total: itemTotal
            });
        }

        // Create order
        const order = {
            id: orderIdCounter++,
            items: validatedItems,
            customerInfo: customerInfo || {},
            totalAmount: calculatedTotal,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        orders.push(order);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: {
                orderId: order.id,
                totalAmount: order.totalAmount,
                status: order.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const order = orders.find(o => o.id === orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // In a real application, you would send an email here
        // For demo purposes, we'll just log it and return success
        console.log('Contact form submission:', { name, email, message });

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        res.json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
});

// Get product categories
app.get('/api/categories', (req, res) => {
    try {
        const categories = [...new Set(products.map(p => p.category))];
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Serve static files for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 BLACK BANNER server running on port ${PORT}`);
    console.log(`📱 Website: http://localhost:${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`💻 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;