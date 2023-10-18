const mongoose = require('mongoose');

// create a mongoose schema for a phone
const phoneSchema = mongoose.Schema({
    manufacturer: String,
    model: String,
    price: String
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Phone', phoneSchema);