const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const saltRounds = 10;

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(404).json({ error: "User already exist" });
    }
    const hash = await bcrypt.hash(password, saltRounds);
    await User.create({ email, password: hash });
    return res.status(201).json({ message: "User created." });
  } catch (error) {
    console.log("Error from create user : ", error);
    return res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ error: "Wrong email or password!" });
    }

    const token = jwt.sign(
      {
        data: { email, id: user.id },
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ id: user.id, email, token });
  } catch (error) {
    console.log("Error from create user : ", error);
    return res.status(400).json(error);
  }
};

exports.verifyToken = (req, res) => {
  res.status(200).json(req.user);
};
