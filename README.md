# Chista

Chista is a RESTful API for an online learning platform, built with **Node.js**, **Express**, and **MongoDB**.

The project provides the backend services required to manage users, courses, categories, articles, comments, orders, discount codes, tickets, notifications, newsletters, and other parts of an educational platform.

## ✨ Features

- User registration and authentication
- JWT-based authentication
- Role-based access control for administrators
- Course management
- Course categories
- Course sessions
- Course registration
- Popular and pre-sale courses
- Related courses
- Article management
- Article drafts
- Comments and admin moderation
- Comment answers
- Orders
- Discount codes
- User management
- User banning
- Newsletter subscription
- Notifications
- Search
- Support tickets
- Ticket departments and sub-departments
- Menu management
- File uploads for course and article covers
- Email support with Nodemailer
- Request validation with Fastest Validator
- MongoDB data modeling with Mongoose

## 🛠 Tech Stack

- **Node.js**
- **Express 5**
- **MongoDB**
- **Mongoose**
- **JWT**
- **Bcrypt**
- **Multer**
- **Nodemailer**
- **Fastest Validator**
- **CORS**
- **Dotenv**
- **Body Parser**

## 📁 Project Structure

```text
Chista/
├── controllers/
│   └── v1/
│       ├── article.js
│       ├── auth.js
│       ├── category.js
│       ├── comment.js
│       ├── contact.js
│       ├── course.js
│       ├── menu.js
│       ├── newsletter.js
│       ├── notification.js
│       ├── off.js
│       ├── orders.js
│       ├── search.js
│       ├── ticket.js
│       └── user.js
│
├── middlewares/
│   ├── auth.js
│   └── isAdmin.js
│
├── models/
│   ├── article.js
│   ├── banPhone.js
│   ├── category.js
│   ├── comment.js
│   ├── contact.js
│   ├── course.js
│   ├── courseUser.js
│   ├── department.js
│   ├── department-sub.js
│   ├── menu.js
│   ├── newsletter.js
│   ├── notification.js
│   ├── off.js
│   ├── session.js
│   ├── ticket.js
│   └── user.js
│
├── routers/
│   └── v1/
│       ├── article.js
│       ├── auth.js
│       ├── category.js
│       ├── comment.js
│       ├── contact.js
│       ├── course.js
│       ├── menu.js
│       ├── newsletter.js
│       ├── notification.js
│       ├── off.js
│       ├── orders.js
│       ├── search.js
│       ├── ticket.js
│       └── user.js
│
├── utils/
│   └── uploader.js
│
├── validators/
│   ├── category.js
│   ├── course.js
│   └── register.js
│
├── public/
│   └── courses/
│       └── covers/
│
├── app.js
├── server.js
├── package.json
└── .env
```

## ⚙️ Requirements

Before running Chista, make sure you have:

- Node.js 18+ recommended
- MongoDB
- npm

## 🚀 Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd chista
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/chista
JWT_SECRET=your_jwt_secret

EMAIL=your_email@example.com
PASSWORD=your_email_password
```

> Never commit `.env` or real credentials to a public repository.

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

The server will run on:

```text
http://localhost:3000
```

The port is controlled by the `PORT` environment variable.

## 🔐 Authentication

Chista uses **JWT (JSON Web Token)** for authentication.

After logging in successfully, send the token with protected requests using the `Authorization` header:

```http
Authorization: Bearer <your-token>
```

Administrator-only routes require both authentication and administrator authorization.

## 🔗 API

All API routes use the `/v1` prefix.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/auth/register` | Register a new user |
| POST | `/v1/auth/login` | Login |
| GET | `/v1/auth/me` | Get current user information |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/users` | Get users |
| GET | `/v1/users/ban/:id` | Ban a user |
| PUT | `/v1/users/:id` | Update a user |
| DELETE | `/v1/users/:id` | Remove a user |
| PUT | `/v1/users/role` | Change user role |

### Courses

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/courses` | Get courses |
| POST | `/v1/courses` | Create a course |
| GET | `/v1/courses/popular` | Get popular courses |
| GET | `/v1/courses/presell` | Get pre-sale courses |
| GET | `/v1/courses/:href` | Get a course |
| PUT | `/v1/courses/:id` | Update a course |
| DELETE | `/v1/courses/:id` | Delete a course |
| GET | `/v1/courses/category/:href` | Get courses by category |
| GET | `/v1/courses/related/:href` | Get related courses |
| GET | `/v1/courses/sessions` | Get course sessions |
| GET | `/v1/courses/sessions/:id` | Get a session |
| DELETE | `/v1/courses/sessions/:id` | Delete a session |
| POST | `/v1/courses/:id/sessions` | Create a course session |
| GET | `/v1/courses/:href/:sessionID` | Get session information |
| POST | `/v1/courses/:id/register` | Register for a course |
| GET | `/v1/courses/:id/register` | Get course registrations |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/categories` | Get categories |
| POST | `/v1/categories` | Create a category |
| PUT | `/v1/categories/:id` | Update a category |
| DELETE | `/v1/categories/:id` | Delete a category |

### Articles

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/articles` | Get articles |
| POST | `/v1/articles` | Create an article |
| PUT | `/v1/articles/:id` | Update an article |
| DELETE | `/v1/articles/:id` | Delete an article |
| GET | `/v1/articles/href/:href` | Get an article |
| GET | `/v1/articles/draft` | Get draft articles |

### Comments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/comments` | Get comments |
| POST | `/v1/comments` | Create a comment |
| GET | `/v1/comments/:id` | Get a comment |
| DELETE | `/v1/comments/:id` | Delete a comment |
| PUT | `/v1/comments/:id/accept` | Accept a comment |
| PUT | `/v1/comments/:id/reject` | Reject a comment |
| POST | `/v1/comments/:id/answer` | Answer a comment |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/orders` | Get user orders |
| GET | `/v1/orders/:id` | Get an order |

### Discount Codes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/offs` | Get discount codes |
| POST | `/v1/offs` | Create a discount code |
| POST | `/v1/offs/all` | Apply discount settings to all courses |
| GET | `/v1/offs/:code` | Get a discount code |
| DELETE | `/v1/offs/:id` | Delete a discount code |

### Search

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/search/:keyword` | Search the platform |

### Newsletter

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/newsletter` | Subscribe to newsletter |
| GET | `/v1/newsletter` | Get newsletter subscribers |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| POST | `/v1/notification` | Create a notification |
| GET | `/v1/notification` | Get notifications |
| GET | `/v1/notification/admins` | Get admin notifications |
| DELETE | `/v1/notification/:id` | Delete a notification |
| PUT | `/v1/notification/:id/see` | Mark a notification as seen |

### Tickets

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/tickets` | Get all tickets |
| POST | `/v1/tickets` | Create a ticket |
| GET | `/v1/tickets/user` | Get current user's tickets |
| GET | `/v1/tickets/departments` | Get departments |
| POST | `/v1/tickets/departments` | Create a department |
| GET | `/v1/tickets/departments/:id/subs` | Get department sub-departments |
| POST | `/v1/tickets/departments-subs` | Create a sub-department |
| POST | `/v1/tickets/answer` | Answer a ticket |
| GET | `/v1/tickets/:id/answer` | Get a ticket answer |

### Menus

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/menus` | Get menus |
| POST | `/v1/menus` | Create a menu |
| GET | `/v1/menus/all` | Get all menus for admin |
| GET | `/v1/menus/:id` | Get a menu |
| PUT | `/v1/menus/:id` | Update a menu |
| DELETE | `/v1/menus/:id` | Delete a menu |

## 🧩 Middleware

### `auth`

Checks whether the request contains a valid JWT token and authenticates the user.

### `isAdmin`

Restricts protected routes to administrator users.

## 📤 File Uploads

Chista uses **Multer** for handling file uploads.

Course and article cover images are uploaded through multipart form-data using the `cover` field.

Example:

```text
Content-Type: multipart/form-data
field: cover
```

## 📧 Email

Email functionality is implemented using **Nodemailer**.

The email credentials are configured through environment variables:

```env
EMAIL=your_email@example.com
PASSWORD=your_email_password
```

For development, use a dedicated test email account rather than personal credentials.

## 🗄️ Database

Chista uses **MongoDB** with **Mongoose** as its ODM.

The connection string is configured through:

```env
MONGO_URL=your_mongodb_connection_string
```

## 🧪 Validation

Input validation is handled with **Fastest Validator**.

Current validation modules include:

- User registration
- Course data
- Category data

Additional validation rules can be added under the `validators/` directory.

## 📮 Postman

The API can be tested and documented using Postman.

A recommended Postman collection structure is:

```text
Chista API
├── Auth
├── Users
├── Courses
├── Categories
├── Articles
├── Comments
├── Orders
├── Discount Codes
├── Search
├── Newsletter
├── Notifications
├── Tickets
└── Menus
```

## 🔒 Security Notes

- Keep JWT secrets outside the source code.
- Never commit `.env` to Git.
- Do not expose email passwords or database credentials.
- Use a dedicated test email for development.
- Rotate credentials immediately if they have already been exposed.

## 📌 Project Status

Chista is an educational backend project focused on building a modular RESTful API for an online learning platform.

Future improvements can include:

- Complete API documentation
- Automated tests
- Request/response schemas
- Improved error handling
- Centralized validation
- API rate limiting
- API versioning improvements
- Docker support
- Production logging
- CI/CD
- Swagger / OpenAPI documentation

## 👨‍💻 Author

**Hurad**

---

Made with Node.js, Express, MongoDB and Mongoose.
