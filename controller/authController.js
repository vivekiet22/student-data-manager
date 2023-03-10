const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect from non-logged user
exports.protect = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: err.message });
  }
};




// Register
exports.register = async (req, res) => {
  const { name, email, password} = req.body;

  let user = await User.findOne({ email });
  try {
    if (user) {
      return res
        .status(400)
        .json({ status: "error", msg: "User already exists" });
    }
    user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    });
    res.status(201).json({ status: "success", data: { user, token } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      });
      res.status(200).json({ status: "success", data: { token } });
    } else {
      res.status(400).json({ status: "fail", msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", msg: err.message });
  }
};
