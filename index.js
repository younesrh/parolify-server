const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = 3001;
const cors = require("cors");
const path = require("path");

// Initialize ENV
dotenv.config();

// Enable CORS
app.use(cors());

// Expose videos & covers
app.use("/static", express.static(path.join(__dirname, "uploads")));

const connectionString = `mongodb+srv://younesrh:${process.env.DB_PASSWORD}@cluster0.f0u2a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Connect to database
const db = mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  });

// import routes.
const auth = require("./routes/auth");
const data = require("./routes/data");

// Middlewares
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/", data);

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports.db = db;
