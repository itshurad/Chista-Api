const articleModel = require("../../models/article");

const {
  checkCreateArticle,
  checkUpdateArticle,
  checkArticleId,
  checkArticleHref,
} = require("../../validators/article");

exports.create = async (req, res) => {
  const validation = checkCreateArticle(req.body);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid article data.",
      errors: validation,
    });
  }

  const { title, description, body, href, categoryID } = req.body;

  if (!req.file) {
    return res.status(400).json({
      message: "Article cover image is required.",
    });
  }

  const article = await articleModel.create({
    title,
    description,
    body,
    cover: req.file.filename,
    href,
    categoryID,
    creator: req.user._id,
    publish: 1,
  });

  return res.status(201).json({
    message: "Article created successfully.",
    article,
  });
};

exports.getAll = async (req, res) => {
  const articles = await articleModel.find({}).lean();

  return res.status(200).json({
    message: "Articles retrieved successfully.",
    articles,
  });
};

exports.getOne = async (req, res) => {
  const validation = checkArticleHref(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid article href.",
      errors: validation,
    });
  }

  const { href } = req.params;

  const article = await articleModel.findOne({ href }).lean();

  if (!article) {
    return res.status(404).json({
      message: "Article not found.",
    });
  }

  return res.status(200).json({
    message: "Article retrieved successfully.",
    article,
  });
};

exports.delete = async (req, res) => {
  const validation = checkArticleId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid article ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const deletedArticle = await articleModel
    .findOneAndDelete({
      _id: id,
    })
    .lean();

  if (!deletedArticle) {
    return res.status(404).json({
      message: "Article not found.",
    });
  }

  return res.status(200).json({
    message: "Article deleted successfully.",
    article: deletedArticle,
  });
};

exports.update = async (req, res) => {
  const idValidation = checkArticleId(req.params);

  if (idValidation !== true) {
    return res.status(400).json({
      message: "Invalid article ID.",
      errors: idValidation,
    });
  }

  const bodyValidation = checkUpdateArticle(req.body);

  if (bodyValidation !== true) {
    return res.status(400).json({
      message: "Invalid article data.",
      errors: bodyValidation,
    });
  }

  const { id } = req.params;
  const { title, description, body, href, categoryID } = req.body;

  const updateData = {
    title,
    description,
    body,
    href,
    categoryID,
  };

  if (req.file) {
    updateData.cover = req.file.filename;
  }

  const article = await articleModel.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });

  if (!article) {
    return res.status(404).json({
      message: "Article not found.",
    });
  }

  return res.status(200).json({
    message: "Article updated successfully.",
    article,
  });
};

exports.draft = async (req, res) => {
  const validation = checkCreateArticle(req.body);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid article data.",
      errors: validation,
    });
  }

  const { title, description, body, href, categoryID } = req.body;

  if (!req.file) {
    return res.status(400).json({
      message: "Article cover image is required.",
    });
  }

  const article = await articleModel.create({
    title,
    description,
    body,
    cover: req.file.filename,
    href,
    categoryID,
    creator: req.user._id,
    publish: 0,
  });

  return res.status(201).json({
    message: "Article draft created successfully.",
    article,
  });
};
