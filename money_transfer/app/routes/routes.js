module.exports = (app) => {
    const users = require('../controllers/controller.js');

    // Find all User Documents
    app.post('/create-balance', users.createBalance)

    // Transfer Money
    app.post('/transfer', users.transferMoney)

    // Get Balance
    app.post('/get-balance', users.getBalance)

    // Top-up account
    app.post('/top-up', users.increaseBalance)
}