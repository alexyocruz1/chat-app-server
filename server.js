const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://alexyocruz1.github.io', // Replace with your client’s origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

// MongoDB connection code
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
});

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI, {
      ssl: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
    });
    console.log("Connected to MongoDB using Mongoose!");

    // Enable CORS for Express
    app.use(cors({
      origin: 'https://alexyocruz1.github.io', // Replace with your client’s origin
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    }));

    app.use(express.json());
    app.use('/api/messages', messageRoutes);

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('sendMessage', async (text) => {
        const message = new Message({ text });
        await message.save();
        io.emit('message', text);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error during startup:", error);
  } finally {
    // Ensure client closure
    // await client.close(); // Uncomment this if you need to close the client connection
  }
}

run().catch(console.dir);