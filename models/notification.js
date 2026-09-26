const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    admin: { type: mongoose.Types.ObjectId, ref: "User" },
    see: { type: Number },
  },
  { timestamps: true },
);
const model = mongoose.model("Notification", schema);

module.exports = model;
