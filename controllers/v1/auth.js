const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../../models/user");
const registerValidator = require("../../validators/register");
const loginValidator = require("../../validators/login");
const banUserModel = require("../../models/banPhone");

exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json({
      message: "Invalid registration data.",
      errors: validationResult,
    });
  }

  const { username, name, email, phone, password } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(409).json({
      message: "Username or email already exists.",
    });
  }

  const isBanUser = await banUserModel.findOne({ phone });

  if (isBanUser) {
    return res.status(409).json({
      message: "This phone number is banned.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const countOfUsers = await userModel.countDocuments();

  const user = await userModel.create({
    username,
    name,
    email,
    phone,
    password: hashedPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObjects = user.toObject();

  Reflect.deleteProperty(userObjects, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 Day",
  });

  return res.status(201).json({
    message: "User registered successfully.",
    user: userObjects,
    accessToken,
  });
};

exports.login = async (req, res) => {
  const validationResult = loginValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json({
      message: "Invalid login data.",
      errors: validationResult,
    });
  }

  const { identifire, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email: identifire }, { username: identifire }],
  });

  if (!user) {
    return res.status(401).json({
      message: "No user found with this email or username.",
    });
  }

  const isPasswordValide = await bcrypt.compare(password, user.password);

  if (!isPasswordValide) {
    return res.status(401).json({
      message: "Incorrect password.",
    });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 Day",
  });

  return res.status(200).json({
    message: "User logged in successfully.",
    accessToken,
  });
};

exports.getMe = async (req, res) => {
  const { _id } = req.user;

  const me = await userModel.findOne({ _id }).lean();

  if (!me) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  return res.status(200).json({
    message: "User information retrieved successfully.",
    me,
  });
};
