const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authcontrollers");

authRouter.post("/login", authController.loginUser);
authRouter.post("/register", authController.registerUser);
authRouter.patch("/reset/:id", authController.resetPassword);
authRouter.post("/forgot-password", authController.forgotPassword);

module.exports = authRouter;
