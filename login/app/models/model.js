const mongoose = require('mongoose');

// create a mongoose schema for a quotation
const userSchema = mongoose.Schema({
    username: String,
    password: String
});

// export the model to our app
module.exports = mongoose.model('User', userSchema);