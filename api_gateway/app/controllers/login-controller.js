const functions = require('./functions');
const loginURL = "http://localhost:3000";

// Login a Specific User
exports.login = async (req, res) => {
    try {
        functions.receiveAndForward(req, res, loginURL + "/login");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the login request.' });
    }
};

// Find a Specific User
exports.findUser = async (req, res) => {
    try {
        functions.receiveAndForward(req, res, loginURL + "/find-user");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the login request.' });
    }
};

// Create User
exports.createUser = async (req, res) => {
    try {
        functions.receiveAndForward(req, res, loginURL + "/create-user");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the login request.' });
    }
};