const Balance = require('../models/model.js');

// Create Balance
exports.createBalance = async (req, res) => {
    try {
        const { userId, balance } = req.body;
        const user = new Balance({ userId, balance });


        const data = await user.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Balance."
        });
    }
};

// Transfer Money Between Users
exports.transferMoney = async (req, res) => {
    try {
        const { userId, receiverId, amount } = req.body;

        // Find the sender and receiver users
        const sender = await Balance.findOne({ userId: userId });
        const receiver = await Balance.findOne({ userId: receiverId });

        // Check if both users exist
        if (!sender || !receiver) {
            return res.status(404).send({ message: 'One or both users not found.' });
        }

        // Check if sender has enough balance
        if (sender.balance < amount) {
            return res.status(400).send({ message: 'Insufficient balance for transfer.' });
        }

        // Deduct the amount from the sender's balance
        sender.balance -= amount;
        // Add the amount to the receiver's balance
        receiver.balance += amount;

        // Save the updated users
        await sender.save();
        await receiver.save();

        res.send({ message: 'Money transferred successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An error occurred while processing the transfer.' });
    }
};

// Get Balance
exports.getBalance = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the sender and receiver users
        const user = await Balance.findOne({ userId });

        // Check if user exist
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        res.send({ balance: user.balance });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An error occurred while getting balance.' });
    }
};

// Increase Balance
exports.increaseBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        // Find the user
        const user = await Balance.findOne({ userId });

        // Check if user exist
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Add the amount to the receiver's balance
        user.balance += amount;

        // Save the updated users
        await user.save();

        res.send({ message: 'Money added successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An error occurred while processing the top-up.' });
    }
};