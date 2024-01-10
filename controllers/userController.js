const bcrypt = require('bcrypt');
const User = require('../models/user')
const { body, validationResult } = require('express-validator');

const userController = {};

userController.createUser = [
    // Validation 
    body('username').trim().isLength({ min: 1 }).escape().withMessage('Username must not be empty'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
    async (req, res, next) => {
      // Check for validation errors
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { username, password, name, lastname, role } = req.body;
        const membershipStatus = 'New';
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create the user
        const user = new User({
          username,
          password: hashedPassword,
          name,
          lastname,
          membershipStatus,
          role,
        });
  
        // Save the user to the database
        await user.save();
  
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
  ];
  
//get all users
userController.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  userController.getUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


module.exports = userController
