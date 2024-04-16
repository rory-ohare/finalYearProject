const axios = require('axios');
const jwt = require('jsonwebtoken');

// Send request onto next microservice
exports.receiveAndForward = async (req, res, targetUrl) => {
    try {
        const response = await axios.post(targetUrl, req.body);
        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ message: 'An error occurred while forwarding the payload.' });
        }
    }
}


//Part of this function was adapted from code from ChatGPT
exports.verifyJwtFromRequest = async (req, secretKey) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.error('Authorization header is missing');
        return null;
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        console.error('Invalid Authorization header format');
        return null;
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, secretKey);

        if (decoded.userId) {
            return decoded.userId;
        } else {
            throw new Error('Token does not contain userId');
        }
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return null;
    }
}