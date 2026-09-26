const newsletterModel = require("../../models/newsletter");

const newsletterValidator = require("../../validators/newsletter");

exports.create = async (req, res) => {
  const validation = newsletterValidator(req.body);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid email address.",
      errors: validation,
    });
  }

  const { email } = req.body;

  const newsletter = await newsletterModel.create({
    email,
  });

  return res.status(201).json({
    message: "Email subscribed to the newsletter successfully.",
    newsletter,
  });
};

exports.getAll = async (req, res) => {
  const newsletter = await newsletterModel.find({}).lean();

  return res.status(200).json({
    message: "Newsletter subscribers retrieved successfully.",
    newsletter,
  });
};
