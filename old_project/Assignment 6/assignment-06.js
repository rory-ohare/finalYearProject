const express = require('express');         // we're making an ExpressJS App
const bodyParser = require('body-parser');  // we'll use body-parser extensively

const app = express();                      // create the ExpressJS app

// parse the different kinds of requests (content-type) the app handles
// use the "use" method to set up the body-parser middlewear
app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // pplication/x-www-form-urlencoded

// Set up Mongoose and our Database connection
const dbConnect = require('./config/connect.js');
const mongoose = require('mongoose');

// Set up connection to the database
mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});

require('./app/routes/routes.js')(app);
//require('./app/routes/phone.routes.js')(app);

// listen for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});