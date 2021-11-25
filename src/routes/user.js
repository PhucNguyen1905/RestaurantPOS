const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/user_authController");
const auth = require('../config/auth');
const isUser = auth.isUser;

route.get("/", userController.viewHome);
route.get("/menu", userController.viewMenu);
route.get("/about", userController.viewAbout);
route.get("/order", userController.viewOrder)
route.get('/menu/:id', userController.viewDetail);
route.post('/menu/filter', userController.viewMenuFilter);
route.post('/menu/search', userController.viewMenuSearch);


// This is for login - logout
route.get('/register', authController.viewRegister);
route.post('/register', authController.register);
route.get('/login', authController.viewLogin);
route.post('/login', authController.login);
route.get('/logout', authController.logout);

module.exports = route;