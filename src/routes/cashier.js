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

// This is for manage category


// This is for login - logout
route.get('/login', cashierController.viewLogin);
route.post('/login', cashierController.login);
route.get('/logout', cashierController.logout);

module.exports = route;