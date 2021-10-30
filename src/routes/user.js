const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.get("/", userController.viewHome);

module.exports = route;