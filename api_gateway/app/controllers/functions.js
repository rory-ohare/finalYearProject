const axios = require('axios');
const jwt = require('jsonwebtoken');

// Send request onto next microservice
exports.receiveAndForward = async (req, res, targetUrl, transformPayload) => {
    try {
        let payload = req.body; // The received JSON payload

        // Apply transformation if provided
        if (transformPayload) {
            payload = transformPayload(payload);
        }

        // Post the edited payload to the target URL
        const response = await axios.post(targetUrl, payload);
        // Send a response back to the client indicating success
        res.status(200).send(response.data);
    } catch (error) {
        // Handle errors
        console.error(error);
        // Check if error.response exists and contains data
        if (error.response) {
            // Forward the error response data to the client
            res.status(error.response.status).send(error.response.data);
        } else {
            // If error.response is not available, send a generic error message
            res.status(500).send({ message: 'An error occurred while forwarding the payload.' });
        }
    }
}

exports.verifyJwtFromRequest = async (req, secretKey) => {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.error('Authorization header is missing');
        return null;
    }

    // Split the header to get the token part
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        console.error('Invalid Authorization header format');
        return null;
    }

    const token = tokenParts[1];

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, secretKey);

        // Check if the token has the 'userId' property
        if (decoded.userId) {
            // If valid and has 'userId', return the userId
            //console.log(decoded.userId);
            return decoded.userId;
        } else {
            // If 'userId' is not present, throw an error
            throw new Error('Token does not contain userId');
        }
    } catch (error) {
        // If verification fails or 'userId' is not present, log the error and return null
        console.error('JWT verification failed:', error.message);
        return null;
    }
}