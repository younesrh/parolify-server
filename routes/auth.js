const router = require("express").Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
