const Customer = require('../models/quotation.model.js');

exports.createCustomer = (req, res) => {

    const customer = new Customer({
        title: req.body.title,
        fname: req.body.fname,
        surname: req.body.surname,
        mobile: req.body.mobile,
        email: req.body.email,
        haddress1: req.body.haddress1,
        haddress2: req.body.haddress2,
        htown: req.body.htown,
        hcounty: req.body.hcounty,
        heircode: req.body.heircode,
        saddress1: req.body.saddress1,
        saddress2: req.body.saddress2,
        stown: req.body.stown,
        scounty: req.body.scounty,
        seircode: req.body.seircode
    });

    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Quotation."
        });
    });
};

exports.findAllCustomers = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Customer."
        });
    });
};

exports.findOneCustomer = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
        });
    });
};

exports.updateCustomer = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }

    Customer.findByIdAndUpdate(req.params.customerId, {
        title: req.body.title,
        fname: req.body.fname,
        surname: req.body.surname,
        mobile: req.body.mobile,
        email: req.body.email,
        haddress1: req.body.haddress1,
        haddress2: req.body.haddress2,
        htown: req.body.htown,
        hcounty: req.body.hcounty,
        heircode: req.body.heircode,
        saddress1: req.body.saddress1,
        saddress2: req.body.saddress2,
        stown: req.body.stown,
        scounty: req.body.scounty,
        seircode: req.body.seircode
    }, 
       { new: true })
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
        });
    });
};


exports.deleteCustomer = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
        });
    });
};