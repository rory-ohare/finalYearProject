const Transaction = require('../models/model.js');


// Create Transaction
exports.createTransaction = async (req, res) => {
    try {
        const { userId, transactionType, amount, description } = req.body;
        const transaction = new Transaction({ userId, transactionType, amount, description });

        const data = await transaction.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred while adding the transaction."
        });
    }
};

exports.getTransactionsByUserId = async (req, res) => {
    try {
        // Assuming the entire request body is used as the query parameters
        const queryParams = req.body;

        // Execute the query with the provided parameters
        const transactions = await Transaction.find(queryParams).exec();

        // Send the transactions back to the client
        res.send(transactions);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred while fetching transactions."
        });
    }
};