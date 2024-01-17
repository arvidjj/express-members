var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require("../controllers/userController");
const Message = require('../models/message');
//jwt
const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', async function (req, res, next) {
  const messages = await Message.find().populate('user', 'username');
  res.render('index', { title: 'Express', messages: messages, currentUser: req.user });
});

router.get('/new', (req, res) => {
  res.render('new-message');
});

router.post("/sign-up", userController.createUser, (req, res) => {
  res.redirect("/");
});

//also needs to use JWT
router.post('/log-in', async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    
    jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '24h'}, (jwtErr, token) => {
      if (jwtErr) {
        return res.status(500).json({ error: jwtErr });
      }
      res.json({ token });
    });
  })(req, res);
});

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

router.get('/membership', (req, res) => {
  res.render('membership');
});

module.exports = router;
