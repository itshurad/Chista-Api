const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  support: { type: String, required: true },
  href: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["PRESELL", "COMPLETED"],
    required: true,
  },
  discount: { type: Number, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  categoryID: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  time: { type: String, required: true },
  students: { type: Number, required: true },
  score: { type: Number, default: 5 },
  semiDescription: { type: String, required: true },
});

schema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "Course",
});
schema.virtual("comments", {
  ref: "Commetn",
  localField: "_id",
  foreignField: "Course",
});

const model = mongoose.model("Course", schema);
module.exports = model;
