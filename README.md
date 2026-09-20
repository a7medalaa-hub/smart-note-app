# Smart Note App
A REST API and GraphQL-based Note Management System built with Node.js and Express.
The application provides user authentication, note management, profile picture uploads, password reset using OTP, GraphQL note queries, and AI-powered note summarization.
## Features
- User registration and login
- Password hashing using bcrypt
- JWT authentication using RSA asymmetric signing (RS256)
- Token revocation on logout
- Profile picture upload using Multer
- Forgot password with OTP
- Password reset with one-time OTP
- Create and delete notes
- GraphQL notes queries
- Filtering and database-level pagination
- Owner information in GraphQL responses
- AI-powered note summarization using Google Gemini
- Joi input validation
- Centralized error handling
- Custom 404 response
- Helmet security headers
- CORS
- Rate limiting
- Environment variables using dotenv
- Modular project structure
## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- Multer
- Nodemailer
- GraphQL
- express-graphql
- Google Gemini API
- Helmet
- CORS
- express-rate-limit
## Project Structure
```text
smart-note-app/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── generate-keys.js
│   │   └── keys/
│   │       ├── private.pem
│   │       └── public.pem
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── note.controller.js
│   │   └── profile.controller.js
│   │
│   ├── graphql/
│   │   ├── note.resolver.js
│   │   └── schema.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── not-found.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── Note.js
│   │   ├── PasswordResetOtp.js
│   │   ├── RevokedToken.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── note.routes.js
│   │   └── profile.routes.js
│   │
│   ├── services/
│   │   ├── ai.service.js
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   ├── note.service.js
│   │   └── token.service.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── note.validator.js
│   │
│   └── app.js
│
├── uploads/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

Requirements

Before running the project, make sure you have:

* Node.js installed
* MongoDB / MongoDB Atlas
* Google Gemini API key
* SMTP credentials for sending password reset OTP emails

Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project:

cd smart-note-app

Install dependencies:

npm install

Environment Variables

Create a .env file in the project root.

Example:

MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
# Add the email credentials required by src/services/email.service.js

Never commit .env or API keys to GitHub.

Generate RSA Keys

The application uses RSA keys for asymmetric JWT signing and verification.

Run:

node src/config/generate-keys.js

This generates:

src/config/keys/private.pem
src/config/keys/public.pem

The private key is used to sign JWTs, while the public key is used to verify them.

Run the Application

Start the server:

node server.js

The server runs on:

http://localhost:3000

Authentication Endpoints

Register

POST /register

Example:

{
  "email": "user@example.com",
  "password": "password123"
}

Login

POST /login

Example:

{
  "email": "user@example.com",
  "password": "password123"
}

The response contains a JWT token.

Use the token in protected endpoints:

Authorization: Bearer YOUR_TOKEN

Logout

POST /logout

Requires authentication.

The login-created JWT is revoked and can no longer be used.

Forgot Password

POST /forget-password

Example:

{
  "email": "user@example.com"
}

If the account exists, an OTP is sent to the user’s email.

Reset Password

POST /reset-password

Example:

{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}

The OTP expires and can only be used once.

Profile Picture

Upload a profile picture using:

PATCH /uplaod-profile-pic

Note: The endpoint name follows the spelling specified in the assessment.

Authentication is required.

Use multipart/form-data with:

profilePicture

The uploaded file is stored locally in the uploads/ directory.

A unique filename is generated to prevent overwriting existing files.

Notes

Create Note

POST /notes

Authentication is required.

Example:

{
  "title": "My Note",
  "content": "This is my note content."
}

The owner is taken from the authenticated JWT rather than trusted from the request body.

Delete Note

DELETE /notes/:id

Authentication is required.

A user can only delete notes that belong to their own account.

AI Note Summarization

POST /notes/:id/summarize

Authentication is required.

The note content is sent to Google Gemini and the API returns:

{
  "summary": "A concise summary of the note."
}

GraphQL

GraphQL endpoint:

POST /graphql

Authentication is required.

Example query:

{
  notes(
    page: 1
    limit: 10
  ) {
    id
    title
    content
    ownerId
    owner {
      id
      email
      profilePicture
    }
    createdAt
    updatedAt
  }
}

Available Filters

The notes query supports:

* userId
* title
* createdFrom
* createdTo
* page
* limit

Example:

{
  notes(
    title: "project"
    page: 1
    limit: 10
  ) {
    id
    title
    content
    owner {
      id
      email
    }
    createdAt
  }
}

Pagination is implemented at the database query level.

Security

The application includes:

* RSA-based JWT signing and verification
* Password hashing with bcrypt
* JWT revocation
* Joi validation
* Helmet
* CORS
* Rate limiting
* Environment variables for sensitive configuration
* Ownership checks for notes
* Generic forgot-password response
* Hashed password-reset OTPs
* One-time OTP usage
* Centralized error handling
* Custom 404 handling

Error Handling

Invalid routes return:

{
  "message": "This router is not exist"
}

Validation errors return a structured response containing the validation messages.

Development

Start the server with:

node server.js

The application connects to MongoDB before starting the HTTP server.

License

This project was developed as a Node.js Junior Developer Assessment project.
