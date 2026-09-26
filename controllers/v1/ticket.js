const ticketsModel = require("../../models/ticket");
const departmentsModel = require("../../models/department");
const departmentsSubsModel = require("../../models/department-sub");

const {
  checkCreateTicket,
  checkAnswerTicket,
  checkCreateDepartment,
  checkCreateDepartmentSub,
  checkTicketId,
} = require("../../validators/ticket");

exports.create = async (req, res) => {
  const validationResult = checkCreateTicket(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid ticket data.",
      errors: validationResult,
    });
  }

  const { departmentID, departmentSubID, priority, title, body, course } =
    req.body;

  const ticket = await ticketsModel.create({
    title,
    body,
    priority,
    departmentID,
    departmentSubID,
    course,
    user: req.user._id,
    answer: 0,
    isAnswer: 0,
  });

  const mainTicket = await ticketsModel
    .findOne({ _id: ticket._id })
    .populate("departmentID")
    .populate("departmentSubID")
    .populate("user", "-password")
    .populate("course")
    .lean();

  return res.status(201).json({
    message: "Ticket created successfully.",
    mainTicket,
  });
};

exports.getAll = async (req, res) => {
  const tickets = await ticketsModel
    .find({})
    .populate("departmentID", "title")
    .populate("departmentSubID", "title")
    .populate("user", "name")
    .lean();

  return res.json({
    message: "All tickets retrieved successfully.",
    tickets,
  });
};

exports.setAnswer = async (req, res) => {
  const validationResult = checkAnswerTicket(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid ticket answer data.",
      errors: validationResult,
    });
  }

  const { title, body, ticketID } = req.body;

  const ticket = await ticketsModel.findOne({ _id: ticketID }).lean();

  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found.",
    });
  }

  const answerTicket = await ticketsModel.create({
    title,
    body,
    parent: ticket._id,
    priority: ticket.priority,
    departmentID: ticket.departmentID,
    departmentSubID: ticket.departmentSubID,
    course: ticket.course,
    user: req.user._id,
    answer: 0,
    isAnswer: 1,
  });

  await ticketsModel.findOneAndUpdate({ _id: ticketID }, { answer: 1 });

  return res.status(201).json({
    message: "Ticket answered successfully.",
    answerTicket,
  });
};

exports.getAnswer = async (req, res) => {
  const validationResult = checkTicketId(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid ticket ID.",
      errors: validationResult,
    });
  }

  const { id } = req.params;

  const ticket = await ticketsModel.findOne({ _id: id }).lean();

  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found.",
    });
  }

  const ticketAnswer = await ticketsModel.findOne({ parent: id }).lean();

  return res.json({
    message: "Ticket details and answer retrieved successfully.",
    ticket,
    ticketAnswer,
  });
};

exports.userTickets = async (req, res) => {
  const tickets = await ticketsModel
    .find({ user: req.user._id })
    .sort({ _id: -1 })
    .populate("departmentID", "title")
    .populate("departmentSubID", "title")
    .populate("user", "name")
    .populate("parent", "title body")
    .lean();

  return res.json({
    message: "User tickets retrieved successfully.",
    tickets,
  });
};

// Department

exports.createDepartments = async (req, res) => {
  const validationResult = checkCreateDepartment(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid department data.",
      errors: validationResult,
    });
  }

  const { title } = req.body;

  const department = await departmentsModel.create({
    title,
  });

  return res.status(201).json({
    message: "Department created successfully.",
    department,
  });
};

exports.createDepartmentsSubs = async (req, res) => {
  const validationResult = checkCreateDepartmentSub(req.body);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid department subcategory data.",
      errors: validationResult,
    });
  }

  const { title, parent } = req.body;

  const departmentSub = await departmentsSubsModel.create({
    title,
    parent,
  });

  return res.status(201).json({
    message: "Department subcategory created successfully.",
    departmentSub,
  });
};

exports.departments = async (req, res) => {
  const departments = await departmentsModel.find({}).lean();

  return res.json({
    message: "All departments retrieved successfully.",
    departments,
  });
};

exports.departmentsSubs = async (req, res) => {
  const validationResult = checkTicketId(req.params);

  if (validationResult !== true) {
    return res.status(400).json({
      message: "Invalid department ID.",
      errors: validationResult,
    });
  }

  const departments = await departmentsSubsModel
    .find({ parent: req.params.id }, "-__v")
    .populate("parent", "-__v")
    .lean();

  return res.json({
    message: "Department subcategories retrieved successfully.",
    departments,
  });
};
