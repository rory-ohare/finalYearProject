const functions = require('./functions');
const loginURL = "http://transfer-service.default.svc.cluster.local:80";
const secretKey = "mySecretKey";

// Login a Specific User
exports.getBalance = async (req, res) => {
    try {
        const userId = await functions.verifyJwtFromRequest(req, secretKey);
        req.body.userId = userId;
        functions.receiveAndForward(req, res, loginURL + "/get-balance");
    } catch (err) {
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
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the balance request.' });
    }
};