const Balance = require('../models/model.js');

// Create Balance
exports.createBalance = async (req, res) => {
    try {
        const user = new Balance({
            userId: req.body.userId,
            balance: req.body.balance
        });

        const data = await user.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Balance."
        });
    }
};