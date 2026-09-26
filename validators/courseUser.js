const Validator = require("fastest-validator");

const v = new Validator();

const courseUserIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const checkCourseUserId = v.compile(courseUserIdSchema);

module.exports = {
  checkCourseUserId,
};