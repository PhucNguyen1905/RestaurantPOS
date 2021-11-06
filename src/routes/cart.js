const express = require("express");
const route = express.Router();
const cartController = require("../controllers/cartController");

route.get('/', cartController.viewCart);
route.get('/add/:id', cartController.addFood);
route.get('/update/:id', cartController.updateCart);
route.get('/clear', cartController.clearCart);

module.exports = route;