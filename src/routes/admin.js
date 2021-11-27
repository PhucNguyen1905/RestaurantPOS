const express = require("express");
const route = express.Router();
const categoryController = require("../controllers/admin_categoryController");
const foodController = require('../controllers/admin_foodController');
const authController = require('../controllers/admin_authControllers');
const statisticsController = require('../controllers/admin_statisticsController');
const customerController = require('../controllers/admin_customerController');
const staffController = require('../controllers/admin_staffController');
const auth = require('../config/auth');
const isAdmin = auth.isAdmin;

// This is for manage category
route.get('/', isAdmin, categoryController.viewCategory);
route.get('/category/add-category', isAdmin, categoryController.viewAddCategory);
route.post('/category/add-category', categoryController.addCategory);
route.get('/category/edit-category/:id', isAdmin, categoryController.viewEditCategory);
route.post('/category/edit-category/:id', categoryController.editCategory);
route.get('/category/delete-category/:id', isAdmin, categoryController.deleteCategory);

// This is for manage food
route.get('/food', isAdmin, foodController.viewFood);
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
route.get('/login', authController.viewLogin);
route.post('/login', authController.login);
route.get('/logout', authController.logout);

//This is for customer management
route.get('/customer', isAdmin, customerController.viewAccount);
route.post('/customer/feedback', customerController.viewFeedback);
route.post('/customer/delete', customerController.deleteAccount);

//This is for statistics
route.get('/bestsellers', isAdmin, statisticsController.viewBestsellers);
route.get('/revenue', isAdmin, statisticsController.viewRevenue);


// This is for staff management
route.get('/staff', isAdmin, staffController.viewListAccount);
route.get('/add-staff', isAdmin, staffController.viewAddStaff);
route.post('/add-staff', staffController.addStaff);
route.get('/delete-staff/:id', isAdmin, staffController.deleteStaff);

module.exports = route;