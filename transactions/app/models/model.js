const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        match: [/^\d{8}$/, 'User ID must consist of 8 numbers']
    },
    password: {
        type: String,
        required: true,
    }
});


const transactionSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    transactionType: {
        type: String,
        enum: ['debit', 'credit'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Transaction', transactionSchema);