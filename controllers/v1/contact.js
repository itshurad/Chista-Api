const contactModel = require("../../models/contact");
const nodemailer = require("nodemailer");
exports.create = async (req, res) => {
  const { name, title, body, email, phone } = req.body;
  const ticket = await contactModel.create({
    name,
    title,
    body,
    email,
    phone,
    answer: 0,
  });
  return res.json({
    message: "Contact request created successfully",
    ticket,
  });
};
exports.getAll = async (req, res) => {
  const contacts = await contactModel.find({}).lean();
  return res.json({
    message: "Contact requests retrieved successfully",
    contacts,
  });
};
exports.delete = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactModel
    .findOneAndDelete({ _id: id })
    .lean();
  if (!deletedContact) {
    return res.status(404).json({ message: "No contact request found" });
  }
  return res.json({
    message: "Contact request deleted successfully",
    deletedContact,
  });
};
exports.answer = async (req, res) => {
  const { id } = req.params;
  const { email, answer } = req.body;

  const contact = await contactModel.findById(id).lean();

  if (!contact) {
    return res.status(404).json({
      message: "Contact request not found.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "پاسخ پیغام شما از سمت آکادمی سبزلرن",
    text: answer,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to send the email.",
        error: error.message,
      });
    }

    await contactModel.findByIdAndUpdate(id, { answer: 1 }, { new: true });

    return res.json({
      message: "Message answered successfully.",
    });
  });
};
