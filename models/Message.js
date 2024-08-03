// models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
}, {
  collection: 'messages' // Specify the collection name
});

module.exports = mongoose.model('Message', messageSchema);