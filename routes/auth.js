const router = require("express").Router();
const User = require("../models/User");
const { validateRegisterUser } = require("../validation");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) return res.send(error.details[0].message);

  // Check if the email exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already in use!");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create the new user
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
  });

  try {
    // Save the new user in db
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
