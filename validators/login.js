const Validator = require("fastest-validator");

const v = new Validator();

const loginSchema = {
  identifire: {
    type: "string",
    min: 3,
    max: 255,
  },

  password: {
    type: "string",
    min: 8,
    max: 100,
  },

  $$strict: true,
};

const checkLogin = v.compile(loginSchema);

module.exports = checkLogin;