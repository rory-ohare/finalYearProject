const axios = require('axios');

// Find all User Documents
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
        res.status(500).send({ message: 'An error occurred while forwarding the payload.' });
    }
}