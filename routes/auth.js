const router = require("express").Router();
const User = require("../models/User");
const { validateRegisterUser, validateLoginUser } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const protected = require("./verifyToken");

// Sign up logic
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
    isAdmin: false,
  });

  try {
    // Save the new user in db
    const savedUser = await newUser.save();
    res.send(savedUser._id);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login logic
router.post("/login", async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.send(error.details[0].message);

  // Check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found!");

  // Check if the password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password invalid!");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  try {
    res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", protected, async (req, res) => {
  const fetchedUser = await User.findOne({ _id: req.user });
  res.json(fetchedUser);
});

module.exports = router;
