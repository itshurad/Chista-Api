const Validator = require("fastest-validator");

const v = new Validator();

const updateUserSchema = {
  name: {
    type: "string",
    min: 3,
    max: 100,
  },

  username: {
    type: "string",
    min: 3,
    max: 50,
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

  email: {
    type: "email",
  },

  $$strict: true,
};

const userIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const changeRoleSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const checkUpdateUser = v.compile(updateUserSchema);
const checkUserId = v.compile(userIdSchema);
const checkChangeRole = v.compile(changeRoleSchema);

module.exports = {
  checkUpdateUser,
  checkUserId,
  checkChangeRole,
};
