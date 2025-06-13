const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username y password requeridos" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  const token = generateToken(user);
  res.json({ token, user: { id: user._id, username: user.username } });
};

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username y password requeridos" });
  }
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = new User({ username, passwordHash });
  await newUser.save();
  const token = generateToken(newUser);
  res
    .status(201)
    .json({ token, user: { id: newUser._id, username: newUser.username } });
};

const getUser = (req, res) => {
  res.json(req.user);
};


module.exports = { login, register, getUser };
