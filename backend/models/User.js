// ./models/User.js
const mongoose = require("mongoose");
const Profile = require("./Profile"); // Import the Profile model

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    otp: {
      otp: { type: String },
      sendTime: { type: Date },
      token: { type: String },
    },
  },
  { timestamps: true }
);

// Create profile automatically after a new user is saved
UserSchema.post("save", async function (doc, next) {
  try {
    const existingProfile = await Profile.findOne({ userId: doc._id });

    if (!existingProfile) {
      // Create a new profile for the user if it doesn't exist
      const profile = new Profile({
        userId: doc._id,
        name: doc.name,
        email: doc.email,
      });

      await profile.save();
    }

    next(); // Continue the execution
  } catch (err) {
    next(err); // Handle any errors
  }
});

module.exports = mongoose.model('User', UserSchema);
