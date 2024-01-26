const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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






app.get('/', (req, res) => {
  const data = {
    message: 'Hello World!',
    timestamp: new Date().toUTCString()
  };

  res.json(data);
});

app.get('/getapigateway', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      const data = response.data;
      // Use the data object as needed
      res.json(data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
});

app.get('/message-pod', (req, res) => {
  axios.get('http://localhost:4000/testpod')
    .then(response => {
      const data = response.data;
      // Use the data object as needed
      res.json(data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
})

app.post('/test-login', (req, res) => {
  const data = req.body;
  res.json(data.username);
  console.log(data.username)
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
