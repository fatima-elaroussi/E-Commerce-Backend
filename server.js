const express = require("express");
const authRoutes = require("./routes/authroutes");
const userroutes = require("./routes/userroutes");
const productroutes = require("./routes/productroutes");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.json());

app.use("/users", userroutes);
app.use("/api", productroutes);
app.use("/api", authRoutes);
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://elaroussifatima7:Success2024@myfirstcluster.sutmdvh.mongodb.net/"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });

app.listen(4000, () => {
  console.log("The server started");
});
