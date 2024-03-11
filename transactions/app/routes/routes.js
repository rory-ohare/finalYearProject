module.exports = (app) => {
    const transactions = require('../controllers/controller.js');

    //Create new transaction
    app.post('/create-transaction', transactions.createTransaction)

    //Find Transactions
    app.post('/find-transactions', transactions.getTransactionsByUserId)
}