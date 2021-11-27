const express = require("express");
const route = express.Router();
const cashierController = require("../controllers/cashierController");
const auth = require('../config/auth');
const isCashier = auth.isCashier;

route.get('/', isCashier, cashierController.viewNewOrder);
route.get('/detail/:id', isCashier, cashierController.viewOrderDetail);
route.get('/delete-order/:id', isCashier, cashierController.deteteOrder);
route.get('/complete-order/:id', isCashier, cashierController.completeOrder);
route.get('/finish-order', isCashier, cashierController.viewFinishOrder);



// This is for manage table
route.get("/table", isCashier, cashierController.manageTable);
route.get("/table-delete/:id/:type", isCashier, cashierController.deleteTable);
route.post("/table-response/:id/:type", cashierController.responseTable);
route.get("/table-resolved", cashierController.viewTableResolved);

// This is for login - logout
route.get('/login', cashierController.viewLogin);
route.post('/login', cashierController.login);
route.get('/logout', cashierController.logout);

module.exports = route;