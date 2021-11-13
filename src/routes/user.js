const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.get("/", userController.viewHome);
route.get("/menu", userController.viewMenu);
route.get("/about", userController.viewAbout);
route.get("/order", userController.viewOrder)
route.get('/menu/:id', userController.viewDetail);
route.post('/menu/filter', userController.viewMenuFilter);
route.post('/menu/search', userController.viewMenuSearch);

module.exports = route;