const Order = require('../models/order.model.js');

// Create a new Order and save to the database
// Create and Save a new Order
exports.createOrder = (req, res) => {

    // Create a new Order (using schema)
    const order = new Order({
        custid: req.body.custid,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        phone3: req.body.phone3,
        phone4: req.body.phone4,
        phone5: req.body.phone5
    });

    // Save Orders in the database
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Order."
        });
    });
};

// Return all Orders in the database
exports.findAllOrders = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all orders."
        });
    });
};

// Find a single Order identified by orderId
exports.findOneOrder = (req, res) => {
    Order.findById(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Order with id " + req.params.orderId
        });
    });
};

// Update a Order identified by the orderId in the request
exports.updateOrder = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty"
        });
    }

    // Find the Order and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        custid: req.body.custid,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        phone3: req.body.phone3,
        phone4: req.body.phone4,
        phone5: req.body.phone5
    }, 
       { new: true })  // "new: true" return updated object
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.orderId
        });
    });
};

// Delete a Order identified by orderId
exports.deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Order with id " + req.params.orderId
        });
    });
};