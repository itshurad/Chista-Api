const offModel = require("../../models/off");
const coursesModel = require("../../models/course");

const {
  checkCreateOff,
  checkSetOnAll,
  checkGetOneOff,
  checkOffId,
} = require("../../validators/off");

exports.getAll = async (req, res) => {
  const offs = await offModel
    .find({}, "-__v")
    .populate("course", "name href")
    .populate("creator", "name")
    .lean();

  return res.json({
    message: "All discount codes retrieved successfully.",
    offs,
  });
};

exports.create = async (req, res) => {
  const validationResult = checkCreateOff(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid discount code data.",
      errors: validationResult,
    });
  }

  const { code, percent, max, course } = req.body;

  const off = await offModel.create({
    code,
    max,
    percent,
    creator: req.user._id,
    course,
    uses: 0,
  });

  return res.status(201).json({
    message: "Discount code created successfully.",
    off,
  });
};

exports.setOnAll = async (req, res) => {
  const validationResult = checkSetOnAll(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid discount data.",
      errors: validationResult,
    });
  }

  const { discount } = req.body;

  await coursesModel.updateMany({}, { discount });

  return res.json({
    message: "Discount updated for all courses successfully.",
  });
};

exports.getOne = async (req, res) => {
  const validationResult = checkGetOneOff({
    code: req.params.code,
    course: req.body.course,
  });

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid discount code data.",
      errors: validationResult,
    });
  }

  const { code } = req.params;
  const { course } = req.body;

  const off = await offModel.findOne({ code, course }).lean();

  if (!off) {
    return res.status(404).json({
      message: "Discount code not found.",
    });
  }

  if (off.max <= off.uses) {
    return res.status(400).json({
      message: "This discount code has reached its usage limit.",
    });
  }

  const updatedOff = await offModel
    .findOneAndUpdate({ code, course }, { $inc: { uses: 1 } }, { new: true })
    .lean();

  return res.json({
    message: "Discount code applied successfully.",
    off: updatedOff,
  });
};

exports.delete = async (req, res) => {
  const validationResult = checkOffId(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid discount code ID.",
      errors: validationResult,
    });
  }

  const { id } = req.params;

  const deletedOff = await offModel.findOneAndDelete({ _id: id }).lean();

  if (!deletedOff) {
    return res.status(404).json({
      message: "Discount code not found.",
    });
  }

  return res.json({
    message: "Discount code deleted successfully.",
    deletedOff,
  });
};
