const authSchema = require("../DbSchema/authSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailValidCheck = require("../helpers/EmailValidateCheck");
const generateOtp = require("../helpers/otpGenerator");
const otp = generateOtp();

//localhost:9090/api/v1/auth/registration
async function registrationController(req, res) {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send("All field require");
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (!EmailValidCheck(email)) {
          res.status(403).send({ msg: "Invalid Email" });
        } else {
          const User = new authSchema({
            name,
            email,
            password: hash,
            OTP: otp,
          });
          await User.save();
          let updateOtp = await authSchema.findOneAndUpdate(
            { email },
            { $set: { OTP: otp } },
            { new: true }
          );
          // setTimeout(async () => {
          //   let updateOtp = await authSchema.findOneAndUpdate(
          //     { email },
          //     { $set: { OTP: null } },
          //     { new: true }
          //   );
          // }, [5000]);
          res.send({
            sucess: true,
            msg: "Registration is successful",
            Data: User,
          });
        }
      }
    });
  }
}

// localhost:9090/api/v1/auth/login
async function loginController(req, res) {
  let { email, password } = req.body;
  const existingUser = await authSchema.findOne({ email });
  if (existingUser) {
    const userInfo = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };
    if (userInfo.role === "user") {
      const token = jwt.sign({ userInfo }, process.env.JWT_SECRET);
      res.cookie("token", token, [
        {
          httpOnly: true,
          secure: false,
        },
      ]);
      res.status(200).send({
        sucess: true,
        msg: "User Login Successful",
        data: userInfo,
        token,
      });
    } else {
      const token = jwt.sign({ userInfo }, process.env.JWT_SECRET);
      res.cookie("token", token, [
        {
          httpOnly: true,
          secure: false,
        },
      ]);
      res.status(200).send({
        sucess: true,
        msg: "Admin Login Successful",
        data: userInfo,
        token,
      });
    }
  } else {
    res.status(403).send({ Not_found: "Invlaid Credantial" });
  }
}

//localhost:9090/api/v1/auth/otp_varify
async function otpVarify(req, res) {
  let { email, OTP } = req.body;
  const otpVarify = await authSchema.findOne({ email });

  if (otpVarify) {
    if (otpVarify.OTP == OTP) {
      otpVarify.isVarify = true;
      await otpVarify.save();
      res
        .status(200)
        .send({ success: true, msg: "OTP varify successful", data: otpVarify });
    } else {
      res.status(404).send(" Invalid Otp");
    }
  } else {
    res.status(402).send({ success: false, msg: "Invalid credantial" });
  }
}

// localhost:9090/api/v1/auth/otp_resend
async function otpresend(req, res) {
  let { email, OTP } = req.body;
  const resendOTP = await authSchema.findOne({ email });
  if (resendOTP) {
    resendOTP.OTP = otp;
    await resendOTP.save();
    res
      .status(200)
      .send({ success: true, msg: "OTP resend successful", data: resendOTP });
  } else {
    res.status(500).send({ Not_Found: "Invalid Email or Password" });
  }
}

module.exports = {
  registrationController,
  loginController,
  otpVarify,
  otpresend,
};
