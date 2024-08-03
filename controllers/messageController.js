const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    // Fetch messages sorted from oldest to newest
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMessage = async (req, res) => {
  const { text, username, color } = req.body;

  // Validate input
  if (!text || !username || !color) {
    return res.status(400).json({ message: 'Text, username, and color are required' });
  }

  const message = new Message({
    text,
    username,
    color,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getMessages,
  createMessage,
};