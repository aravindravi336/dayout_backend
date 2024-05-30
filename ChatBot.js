const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./controllers/packageRouter');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/destinations_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Destination Schema
const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  location: String,
});

const Destination = mongoose.model('Destination', destinationSchema);

// API endpoints
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start server
module.exports=router;