const express = require("express");
const { isUser } = require("../config/auth");
const route = express.Router();
const tableController = require("../controllers/tableController");

route.get("/", isUser, tableController.viewTable);
route.post("/", isUser, tableController.createReserve);

route.get("/rud", isUser, tableController.rudTable);
route.post("/rud", isUser, tableController.rudTable);
route.post("/update/:id", isUser, tableController.updateTable);

route.get("/deleteAll", isUser, tableController.deleteAllTable);
route.get("/delete/:id", isUser, tableController.deleteTable);


module.exports = route;
