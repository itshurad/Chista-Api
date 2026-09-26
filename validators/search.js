const Validator = require("fastest-validator");

const v = new Validator();

const searchSchema = {
  keyword: {
    type: "string",
    min: 1,
    max: 255,
  },

  $$strict: true,
};

const checkSearch = v.compile(searchSchema);

module.exports = {
  checkSearch,
};