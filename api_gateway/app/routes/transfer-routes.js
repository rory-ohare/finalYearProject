module.exports = (app) => {
    const transfer = require('../controllers/transfer-controller.js');

    // Create Balance
    app.post('/create-balance', transfer.createBalance)

    // Transfer Money
    app.post('/transfer', transfer.transferMoney)

    // Get Balance
    app.post('/get-balance', transfer.getBalance)

    // Top-up account
    app.post('/top-up', transfer.increaseBalance)
}