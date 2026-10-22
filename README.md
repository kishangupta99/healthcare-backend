# Healthcare Backend API (Node.js, Express, MongoDB)

A robust, secure backend system for a healthcare application built using Node.js, Express.js, and MongoDB (translating the original Django/PostgreSQL assignment requirements).

---

## Features
* **JWT Authentication:** Secure user registration, password hashing (`bcryptjs`), and token verification.
* **Patient Management:** CRUD operations for patients scoped securely to the authenticated user.
* **Doctor Management:** Public read access and authenticated write/update/delete operations for doctors.
* **Patient-Doctor Mapping:** Many-to-many relationship management with unique constraint prevention and validation.
* **Security Best Practices:** Helmet headers, CORS configuration, rate limiting on auth routes, and `express-validator` input sanitization.

---

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JSON Web Tokens (`jsonwebtoken`)
* **Validation:** `express-validator`

---

## Prerequisites
* Node.js (v18+ recommended)
* MongoDB (Local instance or MongoDB Atlas cluster)

---

## Installation & Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install


Configure environment variables:
Copy .env.example to .env and fill in your configuration:

Bash
cp .env.example .env


Start the application:

Development mode (with nodemon):

Bash
npm run dev
Production mode:

Bash
npm start
Running Tests
Run the Jest automated test suite:

Bash
npm test

---

### Step 8 & 9: Code Review & Final Checklist

* **Authentication & Authorization:** Implemented with JWT and route-level protection middleware. Users can only modify their own patients and mappings.
* **All Endpoints Preserved:**
  * Auth: `/api/auth/register`, `/api/auth/login`
  * Patients: `POST`, `GET`, `GET /:id`, `PUT /:id`, `DELETE /:id`
  * Doctors: `POST`, `GET`, `GET /:id`, `PUT /:id`, `DELETE /:id`
  * Mappings: `POST`, `GET`, `GET /:patientId`, `DELETE /:id`
* **Data Integrity & Validation:** Request bodies are validated using `express-validator`, ObjectIds are validated, and unique compound indexes prevent duplicate assignments.
* **No Python/Django/PostgreSQL:** Completely written in JavaScript using Node.js, Express, and MongoDB.

   
