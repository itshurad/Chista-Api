const Validator = require("fastest-validator");

const v = new Validator();

// Create Contact
const createContactSchema = {
  name: {
    type: "string",
    min: 3,
    max: 100,
  },

  title: {
    type: "string",
    min: 3,
    max: 255,
  },

  body: {
    type: "string",
    min: 3,
    max: 5000,
  },

  email: {
    type: "email",
  },

  phone: {
    type: "string",
    min: 10,
    max: 15,
  },

  $$strict: true,
};

// Answer Contact
const answerContactSchema = {
  email: {
    type: "email",
  },

  answer: {
    type: "string",
    min: 1,
    max: 5000,
  },

  $$strict: true,
};

// Contact ID
const contactIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Compile Validators
const checkCreateContact = v.compile(createContactSchema);
const checkAnswerContact = v.compile(answerContactSchema);
const checkContactId = v.compile(contactIdSchema);

module.exports = {
  checkCreateContact,
  checkAnswerContact,
  checkContactId,
};
