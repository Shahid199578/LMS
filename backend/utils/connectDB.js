const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db is connected");
    })
    .catch((error) => { // Fixing the syntax error here
      console.log("failed to connect to db", error); // Log the error object for better debugging
    });
};

module.exports = connectDB;
