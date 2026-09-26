const Validator = require("fastest-validator");

const v = new Validator();

// Create Comment
const createCommentSchema = {
  body: {
    type: "string",
    min: 3,
    max: 5000,
  },

  courseHref: {
    type: "string",
    min: 1,
    max: 255,
  },

  score: {
    type: "number",
    min: 0,
    max: 5,
    optional: true,
  },

  $$strict: true,
};

// Comment ID
const commentIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Answer Comment
const answerCommentSchema = {
  body: {
    type: "string",
    min: 3,
    max: 5000,
  },

  $$strict: true,
};

const checkCreateComment = v.compile(createCommentSchema);
const checkCommentId = v.compile(commentIdSchema);
const checkAnswerComment = v.compile(answerCommentSchema);

module.exports = {
  checkCreateComment,
  checkCommentId,
  checkAnswerComment,
};
