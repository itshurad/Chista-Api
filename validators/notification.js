const Validator = require("fastest-validator");

const v = new Validator();

// Create Notification
const createNotificationSchema = {
  message: {
    type: "string",
    min: 3,
    max: 1000,
  },

  admin: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

// Notification ID
const notificationIdSchema = {
  id: {
    type: "string",
    length: 24,
    pattern: /^[a-f\d]{24}$/i,
  },

  $$strict: true,
};

const checkCreateNotification = v.compile(createNotificationSchema);

const checkNotificationId = v.compile(notificationIdSchema);

module.exports = {
  checkCreateNotification,
  checkNotificationId,
};
