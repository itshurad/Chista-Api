const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    href: { type: String, required: true },
  },
  { timestamps: true },
);

const model = mongoose.model("Category", categorySchema);
module.exports = model;
