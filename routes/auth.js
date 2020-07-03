const router = require("express").Router();
const User = require("../models/User");

// Validation
const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post("/signup", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.send(error.details[0].message);

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
