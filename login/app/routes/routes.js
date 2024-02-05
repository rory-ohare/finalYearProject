module.exports = (app) => {
    const users = require('../controllers/controller.js');

    //Find all User Documents
    app.get('/get-users', users.findAllUsers)

    //Create a new User
    app.get('/create-user', users.createUser)

    //Decode JWT
    app.get('/jwt-verify', users.verifyJWT)

    //Find a Specific User
    app.post('/find-user', users.findUserByUsernameAndPassword)

    //Login
    app.post('/login', users.login)
}