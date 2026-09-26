const courseModel = require("../../models/course");
const { checkSearch } = require("../../validators/search");

exports.get = async (req, res) => {
  const validationResult = checkSearch(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid search keyword.",
      errors: validationResult,
    });
  }

  const { keyword } = req.params;

  const courses = await courseModel
    .find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    })
    .lean();

  return res.json({
    message: "Courses matching the search keyword retrieved successfully.",
    courses,
  });
};
