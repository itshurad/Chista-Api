const userModel = require("../../models/user");
const banUserModel = require("../../models/banPhone");
const {
  checkUpdateUser,
  checkUserId,
  checkChangeRole,
} = require("../../validators/user");
const bcrypt = require("bcrypt");

exports.getAll = async (req, res) => {
  const users = await userModel.find({}, "-password -__v").lean();

  return res.status(200).json({
    message: "Users retrieved successfully.",
    users,
  });
};

exports.banUser = async (req, res) => {
  const validationResult = checkUserId(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid user ID.",
      errors: validationResult,
    });
  }

  const mainUser = await userModel.findOne({ _id: req.params.id }).lean();

  if (!mainUser) {
    return res.status(404).json({
      message: "No user found with this ID.",
    });
  }

  const banUserResult = await banUserModel.create({
    phone: mainUser.phone,
  });

  return res.status(200).json({
    message: "User banned successfully.",
    banUserResult,
  });
};

exports.removeUser = async (req, res) => {
  const validationResult = checkUserId(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid user ID.",
      errors: validationResult,
    });
  }

  const { id } = req.params;

  const deleteUser = await userModel.findOneAndDelete({
    _id: id,
  });

  if (!deleteUser) {
    return res.status(404).json({
      message: "No user found with this ID.",
    });
  }

  return res.status(200).json({
    message: "User deleted successfully.",
    deleteUser,
  });
};

exports.changeRole = async (req, res) => {
  const validationResult = checkChangeRole(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid user ID.",
      errors: validationResult,
    });
  }

  const { id } = req.body;

  const user = await userModel.findOne({
    _id: id,
  });

  if (!user) {
    return res.status(404).json({
      message: "No user found with this ID.",
    });
  }

  const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  const updatedUser = await userModel
    .findOneAndUpdate({ _id: id }, { role: newRole }, { new: true })
    .select("-password")
    .lean();

  return res.status(200).json({
    message: "User role updated successfully.",
    user: updatedUser,
  });
};

exports.updateUser = async (req, res) => {
  const validationResult = checkUpdateUser(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid user information.",
      errors: validationResult,
    });
  }

  const { name, username, phone, password, email } = req.body;

  const newPassword = await bcrypt.hash(password, 12);

  const user = await userModel
    .findByIdAndUpdate(
      req.user._id,
      {
        name,
        username,
        email,
        phone,
        password: newPassword,
      },
      {
        new: true,
      },
    )
    .select("-password")
    .lean();

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  return res.status(200).json({
    message: "User information updated successfully.",
    user,
  });
};
