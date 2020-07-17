const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = 3001;
const cors = require('cors');

// Initialize ENV
dotenv.config();

// Enable CORS
app.use(cors());

// Connect to database
const db = mongoose
  .connect(process.env.DB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected');
  });

// import routes.
const auth = require('./routes/auth');
const data = require('./routes/data');

// Middlewares
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/', data);

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports.db = db;
