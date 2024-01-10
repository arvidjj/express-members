var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require("../controllers/userController");
const Message = require('../models/message');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const messages = await Message.find().populate('user', 'username'); // Populate author information
  console.log(req.user)
  res.render('index', { title: 'Express', messages: messages, currentUser: req.user });
});

router.get('/new', (req, res) => {
  res.render('new-message');
});

// Handle the creation of a new message
router.post('/create-message', async (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const newMessage = new Message({
      title: req.body.title,
      body: req.body.body,
      user: req.user._id, // Assuming user information is stored in req.user
      timestamp: timestamp
    });
    await newMessage.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/sign-up", userController.createUser, (req, res) => {
  res.redirect("/");
});

router.post('/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in'
  })
);

router.get("/sign-up", function (req, res, next) {
  res.render("sign-up");
});

router.get("/log-in", function (req, res, next) {
  res.render("log-in");
});

router.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
