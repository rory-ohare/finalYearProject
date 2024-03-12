module.exports = (app) => {
    const login = require('../controllers/login-controller.js');

    //Find all User Documents
    //app.get('/get-users', users.findAllUsers)

    //Create a new User
    app.post('/create-user', login.createUser)

    //Verify JWT
    //app.get('/jwt-verify', users.verifyJWT)

    //Find a Specific User
    app.post('/find-user', login.findUser)

    //Login
    app.post('/login', login.login)
}