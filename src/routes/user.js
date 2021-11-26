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
route.get("/register", userController.viewRegister);
route.post('/register',userController.register);
route.get("/login", userController.viewLogin);
route.post("/login", userController.login);
route.get("/logout", userController.logout);
route.get("/info", userController.viewInfo);
route.post("/update_info", userController.updateInfo);
route.post("/info/feedback", userController.giveFeedback);



module.exports = route;