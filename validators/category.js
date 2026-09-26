const Validator = require("fastest-validator");

const v = new Validator();

// Create / Update Category
const categorySchema = {
  title: {
    type: "string",
    min: 3,
    max: 255,
  },

  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  $$strict: true,
};

// Category ID
const categoryIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const checkCategory = v.compile(categorySchema);
const checkCategoryId = v.compile(categoryIdSchema);

module.exports = {
  checkCategory,
  checkCategoryId,
};
