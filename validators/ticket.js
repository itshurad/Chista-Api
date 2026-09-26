const Validator = require("fastest-validator");

const v = new Validator();

const ticketSchema = {
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

  priority: {
    type: "number",
    integer: true,
    min: 1,
    max: 3,
  },

  course: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
    optional: true,
  },

  departmentID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  departmentSubID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const answerTicketSchema = {
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

  ticketID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const createDepartmentSchema = {
  title: {
    type: "string",
    min: 3,
    max: 100,
  },

  $$strict: true,
};

const createDepartmentSubSchema = {
  title: {
    type: "string",
    min: 3,
    max: 100,
  },

  parent: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const ticketIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const checkCreateTicket = v.compile(ticketSchema);
const checkAnswerTicket = v.compile(answerTicketSchema);
const checkCreateDepartment = v.compile(createDepartmentSchema);
const checkCreateDepartmentSub = v.compile(createDepartmentSubSchema);
const checkTicketId = v.compile(ticketIdSchema);

module.exports = {
  checkCreateTicket,
  checkAnswerTicket,
  checkCreateDepartment,
  checkCreateDepartmentSub,
  checkTicketId,
};
