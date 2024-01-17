// routes/messages.js
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const messageController = require('../controllers/messageController');

/* GET messages listing. */
router.get('/', function(req, res, next) {
    messageController.getMessages(req, res, next);
  });
  
// Delete a message
// this should be DELETE, but as we are working with EJS, we use GET
router.get('/delete/:id', function(req, res, next) {
    messageController.deleteMessage(req, res, next);

res.redirect('/');
});

// Handle the creation of a new message
router.post('/create', verifyToken, async (req, res, next) => {
  try {
    let userData = undefined;
    //Con esto puedo obtener el id del usuario que esta creando el mensaje
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        return res.status(403).json({ message: 'Permission denied' });
      } else {
        userData = authData;
      }
    });
    messageController.createMessage(req, res, next);
    res.status(201).json({ message: 'Message created', user : userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  //Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
