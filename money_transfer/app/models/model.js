const mongoose = require('mongoose');

// create a mongoose schema for a quotation
const balanceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        match: [/^\d{8}$/, 'User ID must consist of 8 numbers'],
        unique: true
    },
    balance: {
        type: Number,
        required: true,
    }
});

// export the model to our app
module.exports = mongoose.model('Balance', balanceSchema);