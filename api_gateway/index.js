const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Import routes
require('./app/routes/login-routes.js')(app);
require('./app/routes/transfer-routes.js')(app);
require('./app/routes/transaction-routes.js')(app);

const port = 9000;
app.listen(port, () => {
  console.log(`Transaction Server listening on port ${port}`);
});
