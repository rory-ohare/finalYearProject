// bcrypt learned from https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb

const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// create a mongoose schema for a quotation
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