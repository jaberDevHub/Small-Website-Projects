require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

// Initialize express and http server
const app = express();
const server = http.createServer(app);

// Configure CORS for both Express and Socket.IO
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8080',
  'http://127.0.0.1:8080'
];

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  },
  path: "/socket.io/"
});

// Get port from environment or use 3002 as fallback
const port = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/chatdb`;
let messagesCollection;
let client;

// Function to connect to MongoDB
async function connectToMongo() {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    
    // If using MongoDB Atlas (cloud)
    if (process.env.DB_USER && process.env.DB_PASSWORD) {
      const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.osatkz4.mongodb.net/chatdb?retryWrites=true&w=majority&appName=Cluster0`;
      client = new MongoClient(uri, {
        serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      });
    } else {
      // Fallback to local MongoDB
      console.warn('⚠️ No DB credentials found. Using local MongoDB...');
      client = new MongoClient('mongodb://localhost:27017/chatdb', {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      });
    }

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');
    
    // Initialize collections
    messagesCollection = client.db('chatdb').collection('messages');
    
    // Drop existing TTL index if it exists
    try {
      await messagesCollection.dropIndex('createdAt_1');
      console.log('ℹ️ Dropped existing TTL index');
    } catch (e) {
      // Index didn't exist, which is fine
    }
    
    // Create new indexes
    await messagesCollection.createIndex({ timestamp: -1 });
    await messagesCollection.createIndex(
      { createdAt: 1 },
      { 
        expireAfterSeconds: 20,
        name: 'message_ttl_index'  // Give it a specific name
      }
    );
    console.log('✅ Created TTL index on createdAt field (20s expiry)');
    
    return client;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    console.log('⚠️ Running in local-only mode. Messages will not be persisted.');
    return null;
  }
}

// Function to handle graceful shutdown
async function gracefulShutdown() {
  console.log('\n🛑 Shutting down gracefully...');
  
  try {
    // Close MongoDB connection if it exists
    if (client) {
      await client.close();
      console.log('✅ MongoDB connection closed');
    }
    
    // Close HTTP server
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log('✅ HTTP server closed');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Store connected users
const users = new Map();

io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // Handle new user
  socket.on('new_user', (username) => {
    users.set(socket.id, { username });
    console.log(`👤 ${username} joined the chat`);
    io.emit('user_connected', { 
      userId: socket.id, 
      username,
      timestamp: new Date() 
    });
  });

  // Handle new messages
  socket.on('send_message', async (message) => {
    try {
      if (messagesCollection) {
        const now = new Date();
        const newMessage = {
          ...message,
          createdAt: now,  // Ensure createdAt is set as a Date object
          timestamp: now.getTime()  // Keep timestamp as number for sorting
        };
        
        const result = await messagesCollection.insertOne(newMessage);
        console.log(`💾 Saved message with _id: ${result.insertedId}`);
        
        // Emit the message with all fields including _id and timestamps
        io.emit('new_message', {
          ...newMessage,
          _id: result.insertedId
        });
      }
    } catch (err) {
      console.error('❌ Error saving message:', err);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      console.log(`👋 ${user.username} left the chat`);
      io.emit('user_disconnected', { 
        userId: socket.id, 
        username: user.username,
        timestamp: new Date() 
      });
      users.delete(socket.id);
    }
  });

  // Send initial messages
  if (messagesCollection) {
    messagesCollection.find().sort({ timestamp: -1 }).limit(50).toArray()
      .then(messages => {
        socket.emit('initial_messages', messages.reverse());
      })
      .catch(err => console.error('Error emitting messages:', err));
  }
});

// Routes
app.get('/messages', async (req, res) => {
  if (!messagesCollection) return res.status(503).json({ message: 'Database not connected' });
  const messages = await messagesCollection.find().toArray();
  res.json(messages);
});

app.post('/messages', async (req, res) => {
  if (!messagesCollection) return res.status(503).json({ message: 'Database not connected' });

  const message = req.body;
  try {
    await messagesCollection.insertOne(message);
    io.emit('new_message', message);
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
async function startServer() {
  // Connect to MongoDB (will fall back to in-memory if connection fails)
  await connectToMongo();
  
  // Start HTTP server
  server.listen(port, '0.0.0.0', () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}`);
    console.log('📡 WebSocket endpoint:', `ws://localhost:${port}/socket.io/`);
    console.log('🔄 Press Ctrl+C to stop the server\n');
  });
  
  // Handle server errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${port} is already in use. Please close the other application or use a different port.`);
      console.log('💡 Try setting a different port using the PORT environment variable');
    } else {
      console.error('❌ Server error:', error);
    }
    process.exit(1);
  });
}

// Start the application
startServer().catch(console.error);
