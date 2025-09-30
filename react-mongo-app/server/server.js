const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config({ override: true });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.osatkz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// MongoDB Collection reference (define this outside the async function)
let testCollection;

// Async function to connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    testCollection = client.db("testDB").collection("tests"); // Set the collection
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

// Make sure to run the MongoDB connection before starting the server
connectToMongo().catch(console.error);

// GET: Fetch all tests
app.get("/tests", async (req, res) => {
  try {
    const tests = await testCollection.find().toArray();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tests" });
  }
});

// POST: Add a new test
app.post("/tests", async (req, res) => {
  const newTest = req.body;

  try {
    const result = await testCollection.insertOne(newTest);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add test" });
  }
});

// PUT: Update a test by id
app.put("/tests/:id", async (req, res) => {
  const testId = req.params.id;
  const updatedTest = req.body;

  try {
    const result = await testCollection.updateOne(
      { _id: new ObjectId(testId) },
      { $set: updatedTest }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Test not found" });
    }
    res.json(updatedTest);
  } catch (err) {
    res.status(500).json({ error: "Failed to update test" });
  }
});

// DELETE: Delete a test by id
app.delete("/tests/:id", async (req, res) => {
  const testId = req.params.id;

  try {
    const result = await testCollection.deleteOne({
      _id: new ObjectId(testId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Test not found" });
    }
    res.json({ message: "Test deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete test" });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('🌍 Server is Running');
});

// Start the server after MongoDB connection is established
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
