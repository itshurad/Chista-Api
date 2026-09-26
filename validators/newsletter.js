const Validator = require("fastest-validator");

const v = new Validator();

const newsletterSchema = {
  email: {
    type: "email",
  },

  $$strict: true,
};

const checkCreateNewsletter = v.compile(newsletterSchema);

module.exports = checkCreateNewsletter;
