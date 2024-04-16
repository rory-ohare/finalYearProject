const jwt = require('jsonwebtoken');
const User = require('../models/model.js');
const secretKey = 'mySecretKey';


// Find all User Documents
exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log('Documents found:', users);
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
};

// Find a Specific User
exports.findUser = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.body.userId
        });
        if (!user) {
            return res.status(404).send({ message: 'No user found with this userId.' });
        }
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An error occurred while retrieving the user.' });
    }
};





// Create User
exports.createUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = new User({ userId });
        user.password = user.generateHash(req.body.password);
        const data = await user.save();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred while creating the User." });
    }
};

// Login a Specific User
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.body.userId });

        if (user && user.validPassword(req.body.password)) {
            console.log("Password Matched!");
            const token = jwt.sign({ id: user._id, userId: user.userId }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } else {
            console.log("Password Didn't Match");
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the login request.' });
    }
};