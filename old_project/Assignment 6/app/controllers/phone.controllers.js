const Phone = require('../models/phone.model.js');

// Create a new Phone and save to the database
// Create and Save a new Phone
exports.createPhone = (req, res) => {

    // Create a new Phone (using schema)
    const phone = new Phone({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price
    });

    // Save Phones in the database
    phone.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Phone."
        });
    });
};

// Return all Phones in the database
exports.findAllPhones = (req, res) => {
    Phone.find()
    .then(phones => {
        res.send(phones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all phones."
        });
    });
};

// Find a single Phone identified by phoneId
exports.findOnePhone = (req, res) => {
    Phone.findById(req.params.phoneId)
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });            
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Phone with id " + req.params.phoneId
        });
    });
};

// Update a Phone identified by the phoneId in the request
exports.updatePhone = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Phone content cannot be empty"
        });
    }

    // Find the Phone and update it with the request body
    Phone.findByIdAndUpdate(req.params.phoneId, {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price
    }, 
       { new: true })  // "new: true" return updated object
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        res.send(phone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });                
        }
        return res.status(500).send({
            message: "Error updating Phone with id " + req.params.phoneId
        });
    });
};

// Delete a Phone identified by phoneId
exports.deletePhone = (req, res) => {
    Phone.findByIdAndRemove(req.params.phoneId)
    .then(phone => {
        if(!phone) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });
        }
        res.send({message: "Phone deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.phoneId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Phone with id " + req.params.phoneId
        });
    });
};