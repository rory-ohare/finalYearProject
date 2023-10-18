const mongoose = require('mongoose');

// create a mongoose schema for a quotation
const orderSchema = mongoose.Schema({
    custid: String,
    phone1: String,
    phone2: String,
    phone3: String,
    phone4: String,
    phone5: String,
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Order', orderSchema);