const express = require("express");
const route = express.Router();
const tableController = require("../controllers/tableController");


route.get("/", tableController.viewTable);
route.post("/", tableController.createReserve);

route.get("/rud", tableController.rudTable);
route.post("/rud", tableController.viewTableSearch);
route.post("/update/:id/:phone", tableController.updateTable);
route.post("/updateNamePhone/:phone", tableController.updateNamePhone);

route.get("/deleteAll/:phone", tableController.deleteAllTable);
route.get("/delete/:id/:phone", tableController.deleteTable);

route.get("/manager", tableController.managerTable);
route.get("/managerDelete/:id", tableController.managerDeleteTable);

route.post("/managerResponse/:id", tableController.managerTableResponse);

module.exports = route;
