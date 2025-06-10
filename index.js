require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const router = require("./router");
app.use(express.json());
app.use(express.static("uploads"));
const dbConnect = require("./config/dbConnect");
dbConnect();

//localhost:9090
app.use(router);
app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server is running");
});
