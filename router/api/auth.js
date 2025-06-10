const express = require("express");
const {
  registrationController,
  loginController,
  otpVarify,
  otpresend,
} = require("../../Controllers/authController");
const adminMiddleWareController = require("../../middleWare/adminMiddleWare");
const router = express.Router();

//localhost:9090/api/v1/auth/registration
router.post("/registration", registrationController);

//localhost:9090/api/v1/auth/login
router.post("/login", loginController);

//localhost:9090/api/v1/auth/otp_varify
router.get("/otp_varify", otpVarify);

//localhost:9090/api/v1/auth/otp_resend
router.get("/otp_resend", otpresend);

//localhost:9090/api/v1/auth/admin
router.get("/admin", adminMiddleWareController, (req, res) => {
  res.send("Admin");
});
module.exports = router;
