const mongoose = require('mongoose');

// create a mongoose schema for a quotation
const custSchema = mongoose.Schema({
    title: String,
    fname: String,
    surname: String,
    mobile: String,
    email: String,
    haddress1: String,
    haddress2: String,
    htown: String,
    hcounty: String,
    heircode: String,
    saddress1: String,
    saddress2: String,
    stown: String,
    scounty: String,
    seircode: String
}, {
    timestamps: true
});
// export the model to our app
module.exports = mongoose.model('Customer', custSchema);