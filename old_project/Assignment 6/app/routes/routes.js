module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');
    const phones = require('../controllers/phone.controllers.js');
    const orders = require('../controllers/order.controllers.js');
    

    //Create a new Customer/Phone/Order
    app.post('/customers', customers.createCustomer);
    app.post('/phones', phones.createPhone);
    app.post('/orders', orders.createOrder);

    //Retrieve all Customers/Phones/Orders
    app.get('/customers', customers.findAllCustomers);
    app.get('/phones', phones.findAllPhones);
    app.get('/orders', orders.findAllOrders);


    //Retrieve a single Customer/Phone/Order specified by Id
    app.get('/customers/:customerId', customers.findOneCustomer);
    app.get('/phones/:phoneId', phones.findOnePhone);
    app.get('/orders/:orderId', orders.findOneOrder);


    //Update a Customer/Phone/Order specified by Id
    app.put('/customers/:customerId', customers.updateCustomer);
    app.put('/phones/:phoneId', phones.updatePhone);
    app.put('/orders/:orderId', orders.updateOrder);



    //Delete a Customer/Phone/Order specified by Id
    app.delete('/customers/:customerId', customers.deleteCustomer);
    app.delete('/phones/:phoneId', phones.deletePhone);
    app.delete('/orders/:orderId', orders.deleteOrder);


}


//Opted for a normalised data model connecting the phones and customers to the orders