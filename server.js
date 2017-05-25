var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Configure app for bodyParser()
// Lets us grab data from the body for a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set up port for server to listen on
let port = process.env.PORT || 3000;

// Connect to Data Store
mongoose.connect('mongodb://localhost:27017/codealong');

// API Routes
let router = express.Router();

// Routes will all be prefixed with /api
app.use('/api', router);

// Test Route
router.get('/', (req, res) => {
  res.json({message: 'Welcome to Squads API!'});
});

// Fire up server
app.listen(port);

// Print friendly message to console when fires up
console.log('Server is listening on port ' + port);
