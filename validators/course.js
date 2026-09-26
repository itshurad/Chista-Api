const Validator = require("fastest-validator");

const v = new Validator();

// Create Course
const createCourseSchema = {
  name: {
    type: "string",
    min: 3,
    max: 255,
  },

  description: {
    type: "string",
    min: 3,
  },

  support: {
    type: "string",
    min: 3,
    max: 255,
  },

  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  price: {
    type: "number",
    min: 0,
  },

  status: {
    type: "string",
    enum: ["PRESELL", "COMPLETED"],
  },

  discount: {
    type: "number",
    min: 0,
    max: 100,
  },

  categoryID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  time: {
    type: "string",
    min: 1,
    max: 100,
  },

  students: {
    type: "number",
    integer: true,
    min: 0,
  },

  score: {
    type: "number",
    min: 0,
    max: 5,
  },

  semiDescription: {
    type: "string",
    min: 3,
    max: 500,
  },

  $$strict: true,
};

// Update Course
const updateCourseSchema = {
  name: {
    type: "string",
    min: 3,
    max: 255,
  },

  description: {
    type: "string",
    min: 3,
  },

  support: {
    type: "string",
    min: 3,
    max: 255,
  },

  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  price: {
    type: "number",
    min: 0,
  },

  status: {
    type: "string",
    enum: ["PRESELL", "COMPLETED"],
  },

  discount: {
    type: "number",
    min: 0,
    max: 100,
  },

  categoryID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  time: {
    type: "string",
    min: 1,
    max: 100,
  },

  students: {
    type: "number",
    integer: true,
    min: 0,
  },

  score: {
    type: "number",
    min: 0,
    max: 5,
  },

  semiDescription: {
    type: "string",
    min: 3,
    max: 500,
  },

  $$strict: true,
};

// Course ID
const courseIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Course Href
const courseHrefSchema = {
  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  $$strict: true,
};

// Create Session
const createSessionSchema = {
  title: {
    type: "string",
    min: 3,
    max: 255,
  },

  time: {
    type: "string",
    min: 1,
    max: 100,
  },

  free: {
    type: "number",
    integer: true,
    enum: [0, 1],
  },

  $$strict: true,
};

// Session ID
const sessionIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Session Info Params
const sessionInfoSchema = {
  href: {
    type: "string",
    min: 3,
    max: 255,
  },

  sessionID: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Course Registration
const registerCourseSchema = {
  price: {
    type: "number",
    min: 0,
  },

  $$strict: true,
};

const checkCreateCourse = v.compile(createCourseSchema);
const checkUpdateCourse = v.compile(updateCourseSchema);
const checkCourseId = v.compile(courseIdSchema);
const checkCourseHref = v.compile(courseHrefSchema);
const checkCreateSession = v.compile(createSessionSchema);
const checkSessionId = v.compile(sessionIdSchema);
const checkSessionInfo = v.compile(sessionInfoSchema);
const checkRegisterCourse = v.compile(registerCourseSchema);

module.exports = {
  checkCreateCourse,
  checkUpdateCourse,
  checkCourseId,
  checkCourseHref,
  checkCreateSession,
  checkSessionId,
  checkSessionInfo,
  checkRegisterCourse,
};
