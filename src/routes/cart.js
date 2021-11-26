const express = require("express");
const route = express.Router();
const cartController = require("../controllers/cartController");

// For view cart
route.get('/', cartController.viewCart);
route.post('/add/:id', cartController.addFood);
route.get('/update/:id', cartController.updateCart);
route.get('/clear', cartController.clearCart);

module.exports = route;