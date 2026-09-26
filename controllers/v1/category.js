const categoryModel = require("../../models/category");

const { checkCategory, checkCategoryId } = require("../../validators/category");

exports.create = async (req, res) => {
  const validationResult = checkCategory(req.body);

  if (validationResult !== true) {
    return res.status(422).json({
      message: "Invalid category data.",
      errors: validationResult,
    });
  }

  const { title, href } = req.body;

  const isCategoryExist = await categoryModel.findOne({
    $or: [{ title }, { href }],
  });

  if (isCategoryExist) {
    return res.status(409).json({
      message: "A category with this name or href already exists.",
    });
  }

  const createCategory = await categoryModel.create({
    title,
    href,
  });

  const newHref = href.replace(/[\s_]+/g, "-");

  return res.status(201).json({
    message: "Category created successfully.",
    createCategory,
    href: newHref,
  });
};

exports.getAll = async (req, res) => {
  const categories = await categoryModel.find({}).lean();

  return res.status(200).json({
    message: "Categories retrieved successfully.",
    categories,
  });
};

exports.delete = async (req, res) => {
  const validationResult = checkCategoryId(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid category ID.",
      errors: validationResult,
    });
  }

  const { id } = req.params;

  const deletedCategory = await categoryModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedCategory) {
    return res.status(404).json({
      message: "No category found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Category deleted successfully.",
    deletedCategory,
  });
};

exports.update = async (req, res) => {
  const idValidation = checkCategoryId(req.params);

  if (idValidation !== true) {
    return res.status(400).json({
      message: "Invalid category ID.",
      errors: idValidation,
    });
  }

  const bodyValidation = checkCategory(req.body);

  if (bodyValidation !== true) {
    return res.status(422).json({
      message: "Invalid category data.",
      errors: bodyValidation,
    });
  }

  const { id } = req.params;
  const { title, href } = req.body;

  const updatedCategory = await categoryModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      href,
    },
    {
      new: true,
    },
  );

  if (!updatedCategory) {
    return res.status(404).json({
      message: "No category found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Category updated successfully.",
    category: updatedCategory,
  });
};
