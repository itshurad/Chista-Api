const courseModel = require("../../models/course");
const sessionModel = require("../../models/session");
const courseUserModel = require("../../models/courseUser");
const categoryModel = require("../../models/category");
const commentModel = require("../../models/comment");

const {
  checkCreateCourse,
  checkUpdateCourse,
  checkCourseId,
  checkCourseHref,
  checkCreateSession,
  checkSessionId,
  checkSessionInfo,
  checkRegisterCourse,
} = require("../../validators/course");

// Course

exports.create = async (req, res) => {
  const validation = checkCreateCourse(req.body);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid course data.",
      errors: validation,
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Course cover image is required.",
    });
  }

  const {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
    time,
    students,
    score,
    semiDescription,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    cover: req.file.filename,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
    creator: req.user._id,
    time,
    students,
    score,
    semiDescription,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json({
    message: "Course created successfully.",
    mainCourse,
  });
};

exports.getAll = async (req, res) => {
  const courses = await courseModel
    .find({})
    .populate("creator", "name")
    .populate("categoryID", "title")
    .sort({ _id: -1 })
    .lean();

  const register = await courseUserModel.find({}).lean();
  const comments = await commentModel.find({}).lean();

  const allCourse = [];

  courses.forEach((course) => {
    let courseTotalScore = 5;

    const courseRegister = register.filter(
      (register) => String(register.course) === String(course._id),
    );

    const courseComments = comments.filter(
      (comment) => String(comment.course) === String(course._id),
    );

    courseComments.forEach(
      (comment) => (courseTotalScore += Number(comment.score)),
    );

    const courseAverageScore =
      courseComments.length > 0
        ? courseTotalScore / (courseComments.length + 1)
        : 0;

    allCourse.push({
      ...course,
      categoryID: course.categoryID?.title,
      creator: course.creator?.name,
      registers: courseRegister.length,
      courseAverageScore: Math.floor(courseAverageScore),
    });
  });

  return res.status(200).json({
    message: "Courses retrieved successfully.",
    allCourse,
  });
};

exports.getOne = async (req, res) => {
  const validation = checkCourseHref(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid course href.",
      errors: validation,
    });
  }

  const { href } = req.params;

  const course = await courseModel
    .findOne({ href })
    .populate("categoryID")
    .populate("creator", "-password")
    .lean();

  if (!course) {
    return res.status(404).json({
      message: "Course not found.",
    });
  }

  const sessions = await sessionModel.find({ course: course._id }).lean();

  const comments = await commentModel
    .find({
      course: course._id,
      isAccept: 1,
    })
    .populate("creator", "-password")
    .populate("course")
    .lean();

  const courseStudentCount = await courseUserModel.countDocuments({
    course: course._id,
  });

  const isUserRegisterdToThisCourse = !!(await courseUserModel
    .findOne({
      course: course._id,
      user: req.user._id,
    })
    .lean());

  const allComments = [];

  comments.forEach((comment) => {
    comments.forEach((answerComment) => {
      if (String(comment._id) === String(answerComment.mainCommnetId)) {
        allComments.push({
          ...comment,
          course: comment.course?.name,
          creator: comment.creator?.name,
          answerComment,
        });
      }
    });
  });

  return res.status(200).json({
    message: "Course details retrieved successfully.",
    course,
    comments: allComments,
    sessions,
    courseStudentCount,
    isUserRegisterdToThisCourse,
  });
};

exports.delete = async (req, res) => {
  const validation = checkCourseId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid course ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const deletedCourse = await courseModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedCourse) {
    return res.status(404).json({
      message: "No course found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Course deleted successfully.",
    deletedCourse,
  });
};

exports.relatedCourses = async (req, res) => {
  const validation = checkCourseHref(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid course href.",
      errors: validation,
    });
  }

  const { href } = req.params;

  const course = await courseModel.findOne({ href }).lean();

  if (!course) {
    return res.status(404).json({
      message: "Course not found.",
    });
  }

  let relatedCourses = await courseModel.find({
    categoryID: course.categoryID,
  });

  relatedCourses = relatedCourses.filter((courses) => courses.href !== href);

  return res.status(200).json({
    message: "Related courses retrieved successfully.",
    relatedCourses,
  });
};

exports.presell = async (req, res) => {
  const presellCourses = await courseModel.find({ status: "PRESELL" }).lean();

  return res.status(200).json({
    message: "Presell courses retrieved successfully.",
    presellCourses,
  });
};

exports.popular = async (req, res) => {
  const courses = await courseModel.find({}).lean();

  const popular = courses.sort((a, b) => b.students - a.students);

  return res.status(200).json({
    message: "Popular courses retrieved successfully.",
    popular,
  });
};

exports.update = async (req, res) => {
  const idValidation = checkCourseId(req.params);

  if (idValidation !== true) {
    return res.status(400).json({
      message: "Invalid course ID.",
      errors: idValidation,
    });
  }

  const bodyValidation = checkUpdateCourse(req.body);

  if (bodyValidation !== true) {
    return res.status(400).json({
      message: "Invalid course data.",
      errors: bodyValidation,
    });
  }

  const courseId = req.params.id;

  const {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
    time,
    students,
    score,
    semiDescription,
  } = req.body;

  const updateData = {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
    time,
    students,
    score,
    semiDescription,
  };

  if (req.file) {
    updateData.cover = req.file.filename;
  }

  const updatedCourse = await courseModel.findOneAndUpdate(
    { _id: courseId },
    updateData,
    {
      new: true,
    },
  );

  if (!updatedCourse) {
    return res.status(404).json({
      message: "No course found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Course information updated successfully.",
    updatedCourse,
  });
};

exports.getCoursesByCategoryHref = async (req, res) => {
  const validation = {
    href: req.params.href,
  };

  const categoryHref = validation.href;

  if (
    typeof categoryHref !== "string" ||
    categoryHref.length < 3 ||
    categoryHref.length > 255
  ) {
    return res.status(400).json({
      message: "Invalid category href.",
    });
  }

  const category = await categoryModel
    .findOne({
      href: categoryHref,
    })
    .lean();

  if (!category) {
    return res.status(200).json({
      message: "No courses found for this category.",
      courses: [],
    });
  }

  const courses = await courseModel
    .find({
      categoryID: category._id,
    })
    .populate("categoryID", "title")
    .populate("creator", "name")
    .lean();

  return res.status(200).json({
    message: "Courses retrieved successfully.",
    courses,
  });
};

// Session

exports.createSession = async (req, res) => {
  const idValidation = checkCourseId(req.params);

  if (idValidation !== true) {
    return res.status(400).json({
      message: "Invalid course ID.",
      errors: idValidation,
    });
  }

  const bodyValidation = checkCreateSession(req.body);

  if (bodyValidation !== true) {
    return res.status(400).json({
      message: "Invalid session data.",
      errors: bodyValidation,
    });
  }

  const { title, time, free } = req.body;
  const { id } = req.params;

  const session = await sessionModel.create({
    title,
    time,
    free,
    video: "video.mp4",
    course: id,
  });

  return res.status(201).json({
    message: "Session created successfully.",
    session,
  });
};

exports.getAllSession = async (req, res) => {
  const sessions = await sessionModel
    .find({})
    .populate("course", "name")
    .lean();

  return res.status(200).json({
    message: "Sessions retrieved successfully.",
    sessions,
  });
};

exports.getOneSession = async (req, res) => {
  const validation = checkSessionId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid session ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const session = await sessionModel
    .findOne({ _id: id })
    .populate("course", "name")
    .lean();

  if (!session) {
    return res.status(404).json({
      message: "Session not found.",
    });
  }

  return res.status(200).json({
    message: "Session retrieved successfully.",
    session,
  });
};

exports.getSessionInfo = async (req, res) => {
  const validation = checkSessionInfo(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid session information.",
      errors: validation,
    });
  }

  const { href, sessionID } = req.params;

  const course = await courseModel.findOne({ href }).lean();

  if (!course) {
    return res.status(404).json({
      message: "Course not found.",
    });
  }

  const session = await sessionModel.findOne({ _id: sessionID }).lean();

  if (!session) {
    return res.status(404).json({
      message: "Session not found.",
    });
  }

  const sessions = await sessionModel.find({ course: course._id }).lean();

  return res.status(200).json({
    message: "Session information retrieved successfully.",
    session,
    sessions,
  });
};

exports.deleteSession = async (req, res) => {
  const validation = checkSessionId(req.params);

  if (validation !== true) {
    return res.status(400).json({
      message: "Invalid session ID.",
      errors: validation,
    });
  }

  const { id } = req.params;

  const deletedSession = await sessionModel.findOneAndDelete({
    _id: id,
  });

  if (!deletedSession) {
    return res.status(404).json({
      message: "No session found with this ID.",
    });
  }

  return res.status(200).json({
    message: "Session deleted successfully.",
    deletedSession,
  });
};

exports.register = async (req, res) => {
  const idValidation = checkCourseId(req.params);

  if (idValidation !== true) {
    return res.status(400).json({
      message: "Invalid course ID.",
      errors: idValidation,
    });
  }

  const bodyValidation = checkRegisterCourse(req.body);

  if (bodyValidation !== true) {
    return res.status(400).json({
      message: "Invalid course registration data.",
      errors: bodyValidation,
    });
  }

  const { price } = req.body;
  const { id } = req.params;

  const course = await courseModel.findById(id).lean();

  if (!course) {
    return res.status(404).json({
      message: "Course not found.",
    });
  }

  const isUserAlreadyRegistered = await courseUserModel
    .findOne({
      user: req.user._id,
      course: id,
    })
    .lean();

  if (isUserAlreadyRegistered) {
    return res.status(409).json({
      message: "User is already registered for this course.",
    });
  }

  const register = await courseUserModel.create({
    user: req.user._id,
    course: id,
    price,
  });

  return res.status(201).json({
    message: "Course registration completed successfully.",
    register,
  });
};
