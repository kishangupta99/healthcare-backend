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




   
