const commentModel = require("../../models/comment");
const courseModel = require("../../models/course");

const {
  checkCreateComment,
  checkCommentId,
  checkAnswerComment,
} = require("../../validators/comment");

exports.create = async (req, res) => {
  const validation = checkCreateComment(req.body);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid comment data.",
      errors: validation,
    });
  }

  const { body, courseHref, score } = req.body;

  const course = await courseModel.findOne({ href: courseHref }).lean();

  if (!course) {
    return res.status(404).json({
      message: "Course not found.",
    });
  }

  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
    score,
    isAccept: 0,
    isAnswer: 0,
  });

  const newComment = await commentModel
    .findOne({ _id: comment._id })
    .populate("creator", "-password")
    .populate("course", "name")
    .lean();

  return res.status(201).json({
    message: "Comment created successfully.",
    newComment,
  });
};

exports.getAll = async (req, res) => {
  const comments = await commentModel
    .find({})
    .populate("course", "name")
    .populate("creator", "-password")
    .lean();

  const allComments = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) === String(answerComment.mainCommnetId)) {
        allComments.push({
          ...comment,
          creator: comment.creator?.name,
          course: comment.course?.name,
          answerComment,
        });
      }
    });
  });

  return res.status(200).json({
    message: "Comments retrieved successfully.",
    allComments,
  });
};

exports.delete = async (req, res) => {
  const validation = checkCommentId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid comment ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const deletedComment = await commentModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedComment) {
    return res.status(404).json({
      message: "No comment found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Comment deleted successfully.",
    deletedComment,
  });
};

exports.getOne = async (req, res) => {
  const validation = checkCommentId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid comment ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const comment = await commentModel
    .findOne({ _id: id })
    .populate("course", "name")
    .populate("creator", "-password")
    .lean();

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found.",
    });
  }

  return res.status(200).json({
    message: "Comment retrieved successfully.",
    comment,
  });
};

exports.accept = async (req, res) => {
  const validation = checkCommentId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid comment ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const acceptedComment = await commentModel.findOneAndUpdate(
    { _id: id },
    { isAccept: 1 },
    { new: true },
  );

  if (!acceptedComment) {
    return res.status(404).json({
      message: "No comment found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Comment accepted successfully.",
    acceptedComment,
  });
};

exports.reject = async (req, res) => {
  const validation = checkCommentId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid comment ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const rejectedComment = await commentModel.findOneAndUpdate(
    { _id: id },
    { isAccept: 0 },
    { new: true },
  );

  if (!rejectedComment) {
    return res.status(404).json({
      message: "No comment found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Comment rejected successfully.",
    rejectedComment,
  });
};

exports.answer = async (req, res) => {
  const bodyValidation = checkAnswerComment(req.body);

  if (bodyValidation !== true) {
    return res.status(400).json({
      message: "Invalid comment reply data.",
      errors: bodyValidation,
    });
  }

  const idValidation = checkCommentId(req.params);

  if (idValidation !== true) {
    return res.status(400).json({
      message: "Invalid comment ID.",
      errors: idValidation,
    });
  }

  const { body } = req.body;
  const { id } = req.params;

  const acceptedComment = await commentModel
    .findOneAndUpdate({ _id: id }, { isAccept: 1 }, { new: true })
    .lean();

  if (!acceptedComment) {
    return res.status(404).json({
      message: "No comment found with this ID.",
    });
  }

  const answerComment = await commentModel.create({
    body,
    course: acceptedComment.course,
    creator: req.user._id,
    isAccept: 1,
    isAnswer: 1,
    mainCommnetId: id,
  });

  return res.status(201).json({
    message: "Reply added successfully.",
    answerComment,
  });
};
