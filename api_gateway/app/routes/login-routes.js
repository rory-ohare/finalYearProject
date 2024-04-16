module.exports = (app) => {
    const login = require('../controllers/login-controller.js');

    //Find all User Documents
    //app.get('/get-users', users.findAllUsers)

    //Create a new User
    app.post('/create-user', login.createUser)

    //Find a Specific User
    app.post('/find-user', login.findUser)

    //Login
    app.post('/login', login.login)

    //Login
    app.get('/crash', login.crash)
}