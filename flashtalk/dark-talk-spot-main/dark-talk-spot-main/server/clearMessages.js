require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

async function clearMessages() {
  let client;
  
  try {
    // Match the same connection logic as server.js
    if (process.env.DB_USER && process.env.DB_PASSWORD) {
      const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.osatkz4.mongodb.net/chatdb?retryWrites=true&w=majority&appName=Cluster0`;
      client = new MongoClient(uri, {
        serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      });
    } else {
      console.warn('⚠️ No DB credentials found. Using local MongoDB...');
      client = new MongoClient('mongodb://localhost:27017/chatdb', {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      });
    }

    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB!');

    const db = client.db('chatdb');
    const collection = db.collection('messages');

    const beforeCount = await collection.countDocuments();
    console.log(`🧾 Messages before delete: ${beforeCount}`);

    const result = await collection.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} messages`);

    const afterCount = await collection.countDocuments();
    console.log(`📉 Messages after delete: ${afterCount}`);
  } catch (error) {
    console.error('❌ Error clearing messages:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

clearMessages();
