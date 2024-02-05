// bcrypt learned from https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb

const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// create a mongoose schema for a quotation
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    accountDetails: {
        balance: {
            type: Number,
            required: true,
        },
    },
});

// Hash the password
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// export the model to our app
module.exports = mongoose.model('User', userSchema);