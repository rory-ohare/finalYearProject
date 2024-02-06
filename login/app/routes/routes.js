module.exports = (app) => {
    const users = require('../controllers/controller.js');

    //Find all User Documents
    app.get('/get-users', users.findAllUsers)

    //Create a new User
    app.post('/create-user', users.createUser)

    //Verify JWT
    app.get('/jwt-verify', users.verifyJWT)

    //Find a Specific User
    app.post('/find-user', users.findUser)

    //Login
    app.post('/login', users.login)
}