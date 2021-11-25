const express = require("express");
const route = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require('../config/auth');
const isUser = auth.isUser;

// For view cart
route.get('/', isUser, paymentController.chooseMethod);
route.post('/', paymentController.payment);
route.get('/success', isUser, paymentController.getSuccess);
route.get('/cancel', isUser, paymentController.getCancel);
route.post('/paypal', paymentController.paypal);


module.exports = route;