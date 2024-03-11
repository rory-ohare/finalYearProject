const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Get database connection string
const dbConnect = require('./config/connect.js');

// Connect to database
mongoose.connect(dbConnect.database.url)
  .then(() => {
    console.log("Successfully connected to the MongoDB database");
  }).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
  });


//Import routes
require('./app/routes/routes.js')(app);

const port = 5000;
app.listen(port, () => {
  console.log(`Transaction Server listening on port ${port}`);
});
