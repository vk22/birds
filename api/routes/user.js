const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const settings = require("../config/settings");
const bcrypt = require("bcrypt");
const { jwtToken } = require("../config/config");

/// Login User  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/user/login", async (req, res) => {
  try {
    // const resToken = getToken(req.headers)
    // if (!resToken) {
    //   return res.status(400).json({ message: "Ошибка авторизации" });
    // }
    const { username, password } = req.body;
    console.log("username ", username);
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }
    const validPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!validPassword) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    const token = jwt.sign({ username, password }, jwtToken);
    res.json({ success: true, token: token, username: req.body.username });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Ошибка с доступом" });
  }
});

/// Get User ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/user/user", async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }
    res.json({ success: true, user: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Ошибка с доступом" });
  }
});

getToken = function (headers) {
  console.log('headers ', headers)
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
