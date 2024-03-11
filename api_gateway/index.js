const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Import routes
require('./app/routes/routes.js')(app);

const port = 9000;
app.listen(port, () => {
  console.log(`Transaction Server listening on port ${port}`);
});
