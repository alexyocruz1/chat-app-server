const express = require('express');
const { getMessages, createMessage, deleteAllMessages } = require('../controllers/messageController');
const router = express.Router();

router.get('/', getMessages);
router.post('/', createMessage);
router.delete('/', deleteAllMessages); // Add this line

module.exports = router;