const Message = require('../models/message');
const messageController = {};

//get all message
messageController.getMessages = async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Delete message
messageController.deleteMessage = async (req, res, next) => {
  try {
    const messageId = req.params.id;
    console.log(messageId)
    // Check if the user has the 'admin' role to authorize deletion
    if (req.user && req.user.role === 'admin') {
      const deletedMessage = await Message.findByIdAndDelete(messageId);

      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
      next();
      //return res.status(200).json({ message: 'Message deleted successfully' });
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = messageController;
