const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = new express.Router();

const secret = "CBPollingApp";

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { id, name } = user;
    const token = jwt.sign({ id, name }, secret);
    res.send({ user, token });
  } catch (e) {
    res.send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const validUser = await user.comparePassword(req.body.password);
    const { id, name } = user;
    if (validUser) {
      const token = jwt.sign({ name, id }, secret);
      res.send({ user, token });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    res.json({message: 'Invalid credentials'})
  }
});

module.exports = router;
