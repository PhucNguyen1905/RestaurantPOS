const express = require("express");
const { isUser } = require("../config/auth");
const route = express.Router();
const tableController = require("../controllers/tableController");

route.get("/", isUser, tableController.viewTable);
route.post("/", tableController.createReserve);

route.get("/reserved", isUser, tableController.viewReservedTable);
route.post("/reserved", tableController.viewReservedTable);
route.post("/update/:id", tableController.updateTable);

route.get("/deleteAll", isUser, tableController.deleteAllTable);
route.get("/delete/:id", isUser, tableController.deleteTable);


module.exports = route;
