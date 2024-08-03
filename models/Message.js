const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
}, {
  collection: 'messages', // Specify the collection name
  timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Message', messageSchema);