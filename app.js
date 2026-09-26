const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const authRouter = require("./routers/v1/auth");
const usersRouter = require("./routers/v1/user");
const categoriesRouter = require("./routers/v1/category");
const coursesRouter = require("./routers/v1/course");
const commentsRouter = require("./routers/v1/comment");
const contactsRouter = require("./routers/v1/contact");
const newslettersRouter = require("./routers/v1/newsletter");
const searchRouter = require("./routers/v1/search");
// const notificationsRouter = require("./routers/v1/notification");
const offsRouter = require("./routers/v1/off");
const articlesRouter = require("./routers/v1/article");
const ordersRouter = require("./routers/v1/orders");
const ticketsRouter = require("./routers/v1/ticket");
const menusRouter = require("./routers/v1/menu");

app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "courses")),
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/categories", categoriesRouter);
app.use("/v1/courses", coursesRouter);
app.use("/v1/comments", commentsRouter);
app.use("/v1/contacts", contactsRouter);
app.use("/v1/newsletter", newslettersRouter);
app.use("/v1/search", searchRouter);
// app.use("/v1/notification", notificationsRouter);
app.use("/v1/offs", offsRouter);
app.use("/v1/articles", articlesRouter);
app.use("/v1/orders", ordersRouter);
app.use("/v1/tickets", ticketsRouter);
app.use("/v1/menus", menusRouter);

module.exports = app;
