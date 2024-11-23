// ./models/Profile.js

const mongoose = require('mongoose');

// Profile schema for storing user profile details
const profileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, // Reference to User model
  },
  name: { 
    type: String, 
    required: true,
  },
  email: { 
    type: String, 
    required: true,
  },
  phone: { 
    type: String, 
    default: null, // Set default to null
  },
  address: { 
    type: String, 
    default: null, // Set default to null
  },
  // Add other profile fields as needed
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
