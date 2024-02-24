module.exports = (app) => {
    const users = require('../controllers/controller.js');

    //Find all User Documents
    app.get('/create-balance', users.findAllUsers)
}