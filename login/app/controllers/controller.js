const jwt = require('jsonwebtoken');
const User = require('../models/model.js');


// Find all User Documents
exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log('Documents found:', users);
        res.json(users); // Send the response to the client if needed
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error'); // Send an error response if needed
    }
};

// Find a Specific User
exports.findUser = async (req, res) => {
    try {
        const user = await User.findOne({
            userId: req.body.userId
        });

        if (!user) {
            return res.status(404).send({ message: 'No user found with this userId and password.' });
        }

        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'An error occurred while retrieving the user.' });
    }
};





// Create Users
exports.createUser = async (req, res) => {
    try {
        const user = new User({
            userId: req.body.userId
        });

        user.password = user.generateHash("myPassword");
        const data = await user.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "An error occurred while creating the User."
        });
    }
};

// Login a Specific User
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.body.userId });

        if (user && user.validPassword(req.body.password)) {
            // Password matched. Proceed forward
            console.log("Password Matched!");

            // Generate a JWT
            const token = jwt.sign({ id: user._id, userId: user.userId }, 'mySecretKey', { expiresIn: '1h' });

            // Return the JWT in the response
            res.json({ token });
        } else {
            // Password did not match
            console.log("Password Didn't Match");
            res.status(401).json({ message: 'Authentication failed. Invalid userId or password.' });
        }
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: 'An error occurred while processing the login request.' });
    }
};

// Function to verify a JWT token and return its contents
exports.verifyJWT = (req, res) => {
    try {
        // Get the token from the request headers
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing.' });
        }

        // Split the header into scheme and token
        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ message: 'Authorization header format must be Bearer <token>' });
        }

        const scheme = parts[0];
        const token = parts[1];

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: 'Authorization scheme must be Bearer' });
        }

        // Your secret key used to sign the JWT
        const secretKey = 'mySecretKey';

        // Verify the token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // If the token is invalid, respond with an error message
                return res.status(401).json({ message: 'Invalid token.' });
            }

            // If the token is valid, return the decoded payload
            res.json({ payload: decoded });
        });
    } catch (error) {
        console.error('Error verifying JWT:', error);
        res.status(500).json({ message: 'An error occurred while verifying the JWT.' });
    }
};
