const express = require('express');
const axios = require('axios');
const test_post = require('./requests/test.json');




const app = express();

app.get('/', (req, res) => {
  const data = {
    message: 'Hello World!',
    timestamp: new Date().toUTCString()
  };

  res.json(data);
});

app.get('/testpod', (req, res) => {
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

app.get('/updatefile', (req, res) => {
  res.json(test_post);
})

app.post('/test-post', (req, res) => {
  const data = req.body;
  res.json(data);
})

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
