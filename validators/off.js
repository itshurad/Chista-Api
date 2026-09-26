const Validator = require("fastest-validator");

const v = new Validator();

const createOffSchema = {
  code: {
    type: "string",
    min: 3,
    max: 50,
  },

  percent: {
    type: "number",
    integer: true,
    min: 1,
    max: 100,
  },

  max: {
    type: "number",
    integer: true,
    min: 1,
  },

  course: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const setOnAllSchema = {
  discount: {
    type: "number",
    integer: true,
    min: 0,
    max: 100,
  },

  $$strict: true,
};

const getOneOffSchema = {
  code: {
    type: "string",
    min: 3,
    max: 50,
  },

  course: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const offIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const checkCreateOff = v.compile(createOffSchema);
const checkSetOnAll = v.compile(setOnAllSchema);
const checkGetOneOff = v.compile(getOneOffSchema);
const checkOffId = v.compile(offIdSchema);

module.exports = {
  checkCreateOff,
  checkSetOnAll,
  checkGetOneOff,
  checkOffId,
};
