const express = require("express");
const route = express.Router();
const categoryController = require("../controllers/admin_categoryController");
const foodController = require('../controllers/admin_foodController');
const authController = require('../controllers/admin_authControllers');
const auth = require('../config/auth');
const isAdmin = auth.isAdmin;

route.get('/', isAdmin, categoryController.viewAdminPanel);

// This is for manage category
route.get('/category', isAdmin, categoryController.viewCategory);
route.get('/category/add-category', isAdmin, categoryController.viewAddCategory);
route.post('/category/add-category', categoryController.addCategory);
route.get('/category/edit-category/:id', isAdmin, categoryController.viewEditCategory);
route.post('/category/edit-category/:id', categoryController.editCategory);
route.get('/category/delete-category/:id', isAdmin, categoryController.deleteCategory);

// This is for manage food
route.get('/food', foodController.viewFood);
route.get('/food/add-food', isAdmin, foodController.viewAddFood);
route.post('/food/add-food', foodController.addFood);
route.get('/food/edit-food/:id', isAdmin, foodController.viewEditFood);
route.post('/food/edit-food/:id', foodController.editFood);
route.get('/food/delete-food/:id', isAdmin, foodController.deleteFood);

// This is for food status
// route.get('/food/status', isAdmin, foodController.viewFoodStatus);
route.get('/food/status-on/:id', isAdmin, foodController.statusOn);
route.get('/food/status-off/:id', isAdmin, foodController.statusOff);

// This is for login - logout
route.get('/register', authController.viewRegister);
route.post('/register', authController.register);
route.get('/login', authController.viewLogin);
route.post('/login', authController.login);
route.get('/logout', authController.logout);

module.exports = route;