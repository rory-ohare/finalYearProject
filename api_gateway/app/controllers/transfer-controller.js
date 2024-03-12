const functions = require('./functions');
const loginURL = "http://localhost:4000";
const secretKey = "mySecretKey";

// Login a Specific User
exports.getBalance = async (req, res) => {
    try {
        const userId = await functions.verifyJwtFromRequest(req, secretKey);
        req.body.userId = userId;
        functions.receiveAndForward(req, res, loginURL + "/get-balance");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the balance request.' });
    }
};

// Top-up account
exports.increaseBalance = async (req, res) => {
    try {
        const userId = await functions.verifyJwtFromRequest(req, secretKey);
        req.body.userId = userId;
        functions.receiveAndForward(req, res, loginURL + "/top-up");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the balance request.' });
    }
};

// Top-up account
exports.transferMoney = async (req, res) => {
    try {
        const userId = await functions.verifyJwtFromRequest(req, secretKey);
        req.body.userId = userId;
        functions.receiveAndForward(req, res, loginURL + "/transfer");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the balance request.' });
    }
};

// Create Balance
exports.createBalance = async (req, res) => {
    try {
        const userId = await functions.verifyJwtFromRequest(req, secretKey);
        req.body.userId = userId;
        functions.receiveAndForward(req, res, loginURL + "/create-balance");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the balance request.' });
    }
};