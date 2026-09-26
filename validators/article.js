const Validator = require("fastest-validator");

const v = new Validator();

// Create / Draft Article
const createArticleSchema = {
  title: {
    type: "string",
    min: 3,
    max: 255,
  },

  description: {
    type: "string",
    min: 3,
    max: 1000,
  },

  body: {
    type: "string",
    min: 3,
    max: 10000,
  },

  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  categoryID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Update Article
const updateArticleSchema = {
  title: {
    type: "string",
    min: 3,
    max: 255,
  },

  description: {
    type: "string",
    min: 3,
    max: 1000,
  },

  body: {
    type: "string",
    min: 3,
    max: 10000,
  },

  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  categoryID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Article ID
const articleIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Article Href
const articleHrefSchema = {
  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  $$strict: true,
};

const checkCreateArticle = v.compile(createArticleSchema);
const checkUpdateArticle = v.compile(updateArticleSchema);
const checkArticleId = v.compile(articleIdSchema);
const checkArticleHref = v.compile(articleHrefSchema);

module.exports = {
  checkCreateArticle,
  checkUpdateArticle,
  checkArticleId,
  checkArticleHref,
};
