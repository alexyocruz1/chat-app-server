// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');
const messageRoutes = require('./routes/messages');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Connect to MongoDB using Mongoose
    mongoose.connect(mongoDBeUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.use(cors());
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
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Comment this out to keep the connection open
  }
}
run().catch(console.dir);