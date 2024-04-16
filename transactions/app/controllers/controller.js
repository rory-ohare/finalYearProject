const Transaction = require('../models/model.js');


// Create Transaction
exports.createTransaction = async (req, res) => {
    try {
        const { userId, transactionType, amount, description } = req.body;
        const transaction = new Transaction({ userId, transactionType, amount, description });

        const data = await transaction.save();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred while adding the transaction." });
    }
};

exports.getTransactionsByUserId = async (req, res) => {
    try {
        const queryParams = req.body;
        const transactions = await Transaction.find(queryParams).exec();
        res.send(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred while fetching transactions." });
    }
};