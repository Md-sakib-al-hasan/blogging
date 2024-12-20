# BlogAPIBackend

This project provides a RESTful API for managing user authentication, blog creation, and administration for a blogging platform. It includes features such as user registration and login, blog creation, updating and deleting personal blogs, and administrative functions like blocking users and deleting any blog. The API supports role-based access control for Admin and User roles, secure authentication with JWT, and CRUD operations on blogs. Additionally, search, sort, and filter functionalities are included for fetching blogs, using MongoDB with Mongoose for data management and Zod for data validation.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)

---

## Features

- **User Management**: Register, log in, and manage user roles (Admin and User) with secure authentication.
- **Blog Management**: Create, update, delete, and fetch personal blog posts for users. Admins can delete any blog and manage user statuses.
- **Role-Based Access Control**: Differentiated access for Admin and User roles, ensuring proper permissions for blog actions.
- **Search, Sort, and Filter**: Advanced search, sorting, and filtering functionalities for retrieving blogs based on title, content, and author.
- **Public Blog API**: Public API endpoints to fetch blogs with optional search and filter capabilities.
- **Error Handling**: Middleware-based error handling with standardized responses for validation, authentication, and authorization errors.
- **Database Integration**: MongoDB with Mongoose for managing user and blog data, including schema validation and hooks.
- **Token-Based Authentication**: JWT-based authentication for secured API access and role validation.
- **Admin Actions**: Admin privileges for blocking users and deleting any blog, with proper role-based access.

---

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Validation**: Zod
- **Authentication**: JWT (JSON Web Tokens)
- **TypeScript**: Ensures type safety across the application
- **API Documentation**: Postman (for API testing)
- **Error Handling**: Custom middleware for standardized error responses

---

## Installation

### Prerequisites

1. Node.js (v14 or later)
2. MongoDB (local or cloud instance)
3. TypeScript (v4 or later)
4. ESLint (for linting TypeScript files)
5. Prettier (for code formatting)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Md-sakib-al-hasan/blogging

   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following environment variables:

   ```plaintext
   NODE_ENV=development
   # PORT=Specify the port number.
   PORT=5000
   # DATABASE_URL=URL to connect to the database
   DATABASE_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
   #JWT_SECRET
   #JWT_ACCESS_EXPIRES_IN
   #BCRYPT_SALT_ROUNDS
   ```

4. Start the server:
   ```bash
      npm run start
   ```

---

## Environment Variables

The application requires the following environment variables to be set in a .env file:

| Variable              | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| NODE_ENV              | The environment (e.g., development or production).                      |
| PORT                  | Port on which the server will run (default: 5000).                      |
| DATABASE_URL          | MongoDB connection string. Replace with your actual connection details. |
| JWT_SECRET            | Secret key used to sign and verify JWT tokens.                          |
| JWT_ACCESS_EXPIRES_IN | Expiration time for access tokens (e.g., 1h, 7d).                       |
| BCRYPT_SALT_ROUNDS    | Number of salt rounds for bcrypt hashing (e.g., 10).                    |

---

# API Endpoints

## User Management

| HTTP Method | Endpoint                         | Description                                                                         |
| ----------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `POST`      | `/api/auth/register`             | Register a new user. Validates request using UserValidations.userchmeavalidations.  |
| `POST`      | `/api/auth/login`                | Log in a user. Validates request using AuthValidation.loginValidationSchema.        |
| `PATCH`     | `/api/admin/users/:userId/block` | Block a user by updating the isBlocked property to true. Requires admin privileges. |

## Blog Management

| HTTP Method | Endpoint                                                                                       | Description                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `POST`      | `	/api/blogs`                                                                                   | Create a new blog. Requires user authentication. Validates using BlogValidations.blogValidationSchema.             |
| `PATCH`     | `/api/blogs/:id`                                                                               | Update a blog by its ID. Requires user authentication. Validates using BlogValidations.blogUpdateValidationSchema. |
| `DELETE`    | `/api/blogs/:id`                                                                               | Delete a blog by its ID. Requires user authentication. Validates using BlogValidations.IdvalidationSchema.         |
| `DELETE`    | `/api/admin/blogs/:id`                                                                         | Delete any blog by its ID. Requires admin privileges. Validates using AdminValidations.IdvalidationSchema.         |
| `GET`       | `/api/blogs`                                                                                   | Fetch all blogs. Public API, with optional query parameters for search, sort, and filter.                          |




## Additional Example for Query Parameters

| HTTP Method | Endpoint                                                                                       | Description                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`       | `/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18	` | Fetch blogs with advanced search, sorting, and filtering options. 



---


## Architecture


```bash
/app
├── config/
│   ├── db.conf.js
│   ├── app.conf.js
│   ├── app.keys.js
│   ├── db.keys.js
│   ├── init.js
├── database/
│   ├── Redis.database.js
│   ├── Mongo.database.js
│   ├── init.js
├── routes/
│   ├── App.routes.js
│   ├── Auth.routes.js
│   ├── Dashboard.routes.js
├── utils/
│   ├── Logger.util.js
├── middleware/
│   ├── App.middleware.js
│   ├── ErrorHandler.middleware.js
│   ├── init.js
├── models/
│   ├── User.model.js
├── controllers/
│   ├── App.controller.js
│   ├── User.controller.js
├── helpers/
│   ├── App.helper.js
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── support/
│   │   ├── index.ejs
│   ├── documentation/
│   │   ├── index.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
/public
├── dist/
├── images/
│   ├── dashboard/
│   ├── auth/
│   ├── documentation/      
├── sitemap.xml
/samples
├── .env.sample
├── db.conf.sample
├── app.conf.sample
├── app.keys.sample
/src
├── javascript/
├── css/
/node_modules
/server.js
/package.json
/.env
```


