// ./app.js

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const connectDB = require("./utils/connectDB");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // The URL of your React app
    // methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  const message = error.message || "server error";
  const statusCode = error.statusCode || 500;
  console.error("Error: ", error);
  res.status(statusCode).json({ messag: message });
});

// Routes
app.use("/api/user", userRoutes);

// Debugging log to check if the routes are registered
app.all("*", (req, res) => {
  console.log(`Route hit: ${req.method} ${req.originalUrl}`);
  res.status(404).send("Not Found");
});

// Database Connection
connectDB();

module.exports = app;
