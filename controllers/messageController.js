const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMessage = async (req, res) => {
  const message = new Message({
    text: req.body.text,
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