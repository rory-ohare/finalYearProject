const functions = require('./functions');
const loginURL = "http://transactions-service.default.svc.cluster.local:80";
const secretKey = "mySecretKey";

// Create Transaction
exports.createTransaction = async (req, res) => {
    try {
        const userId = await functions.verifyJwtFromRequest(req, secretKey);
        req.body.userId = userId;
        functions.receiveAndForward(req, res, loginURL + "/create-transaction");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the balance request.' });
    }
};

// Create Transaction
exports.getTransactionsByUserId = async (req, res) => {
    try {
        const userId = await functions.verifyJwtFromRequest(req, secretKey);
        req.body.userId = userId;
        functions.receiveAndForward(req, res, loginURL + "/find-transactions");
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the balance request.' });
    }
};