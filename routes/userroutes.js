const express = require("express");
const userroute = express.Router();
const usercontrollers = require("../controllers/usercontrollers");


userroute.get("/", usercontrollers.usersget);
userroute.get("/:id", usercontrollers.usersgetbyid);
userroute.put("/updateUser/:id", usercontrollers.updateUser);
userroute.delete("/deleteuser/:id", usercontrollers.deleteuser);







module.exports = userroute;