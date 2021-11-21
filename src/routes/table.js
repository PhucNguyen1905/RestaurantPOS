const express = require("express");
const route = express.Router();
const tableController = require("../controllers/tableController");


route.get("/", tableController.viewTable);
route.post("/", tableController.createReserve);

route.get("/rud", tableController.rudTable);
route.post("/rud", tableController.viewCodeSearch);
route.post("/update/:code", tableController.updateTable);
route.post("/updateNamePhone/:phone", tableController.updateNamePhone);

route.get("/delete/:phone", tableController.deleteAllTable);
route.get("/delete1/:code", tableController.deleteTable);

module.exports = route;
