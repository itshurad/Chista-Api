const Validator = require("fastest-validator");

const v = new Validator();

const registerSchema = {
  username: {
    type: "string",
    min: 3,
    max: 50,
  },

  name: {
    type: "string",
    min: 3,
    max: 100,
  },

  email: {
    type: "email",
  },

  phone: {
    type: "string",
    min: 10,
    max: 15,
  },

  password: {
    type: "string",
    min: 8,
    max: 100,
  },

  $$strict: true,
};

const checkRegister = v.compile(registerSchema);

module.exports = checkRegister;
