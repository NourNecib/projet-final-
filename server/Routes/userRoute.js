const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../Middlewares/isAuth");  

router.post("/register", async (req, res) => {
  try {
    const { fullName, age, adress, phone_number, email, password, role, number_of_car, license_plate_number } = req.body;    
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ msg: "This email already exist" });
    } else {
      const saltRounds = 10;
      const cryptedPwd = await bcrypt.hash(password, saltRounds);
      const newUser = {
        fullName: fullName,
        age: age,
        adress: adress,
        phone_number: phone_number,
        email: email,
        password: cryptedPwd,
        role: role,
        number_of_car: number_of_car,
        license_plate_number: license_plate_number,
      }; 
      await User.create(newUser);
      const payload = {
        id: newUser._id,
      };
      const token = jwt.sign(payload, process.env.privateKey, {
        expiresIn: "24h",
      });
      res.send({ msg: "User created!", user: newUser, token: token });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.send({ msg: "User not found!" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.send({ msg: "Bad password!" });
      } else {
        const payload = {
          id: user._id,
        };
        const token = jwt.sign(payload, process.env.privateKey, {
          expiresIn: "24h",
        });
        res.send({ msg: "User connected", user: user, token: token });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/isAuth", isAuth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
