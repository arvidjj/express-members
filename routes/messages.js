// routes/messages.js
var express = require('express');
var router = express.Router();
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

module.exports = router;
