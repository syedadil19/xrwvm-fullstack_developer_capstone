/*jshint esversion: 8 */

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');  // Add missing semicolon
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/", {'dbName':'dealershipsDB'});

const Reviews = require('./review');
const Dealerships = require('./dealership');

try {
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data.reviews);  // Use dot notation
  });
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealerships_data.dealerships);  // Use dot notation
  });
  
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}

// Express routes
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchDealers', async (req, res) => {
  try {
    const dealers = await Dealerships.find();
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships' });
  }
});

app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const dealers = await Dealerships.find({ state: req.params.state });
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships by state' });
  }
});

app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const dealer = await Dealerships.find({ id: req.params.id });
    res.json(dealer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealership by ID' });
  }
});

app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  const data = JSON.parse(req.body);  // Declare 'data' as const
  const documents = await Reviews.find().sort({ id: -1 });
  const new_id = documents[0].id + 1;  // Use dot notation and add semicolon

  const review = new Reviews({
    id: new_id,  // Use dot notation
    name: data.name,  // Use dot notation
    dealership: data.dealership,  // Use dot notation
    review: data.review,  // Use dot notation
    purchase: data.purchase,  // Use dot notation
    purchase_date: data.purchase_date,  // Use dot notation
    car_make: data.car_make,  // Use dot notation
    car_model: data.car_model,  // Use dot notation
    car_year: data.car_year  // Use dot notation
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
