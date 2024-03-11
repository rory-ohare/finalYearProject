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