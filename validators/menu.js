const Validator = require("fastest-validator");

const v = new Validator();

// Create / Update Menu
const menuSchema = {
  title: {
    type: "string",
    min: 3,
    max: 255,
  },

  href: {
    type: "string",
    min: 1,
    max: 255,
  },

  parent: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
    optional: true,
  },

  $$strict: true,
};

// Menu ID
const menuIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const checkMenu = v.compile(menuSchema);
const checkMenuId = v.compile(menuIdSchema);

module.exports = {
  checkMenu,
  checkMenuId,
};
