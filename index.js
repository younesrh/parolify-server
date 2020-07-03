const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = 3001;

// initialize ENV
dotenv.config();

// Connect to database
mongoose
  .connect(process.env.DB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  });

// import routes.
const auth = require("./routes/auth");

// Middlewares
app.use(express.json());

app.use("/api/auth", auth);

app.listen(port, () => console.log(`Server running on port ${port}`));
