# JWT Implementation Guide for WhatsApp Order System

This document explains JSON Web Tokens (JWT) and details how to implement them specifically for your Node.js + Express + PostgreSQL backend.

## 1. Concepts: What is a JWT?

A JSON Web Token (JWT) is a secure way to transmit information between parties as a JSON object. It is **compact** and **self-contained**.

### Structure of a JWT
A JWT looks like `xxxxx.yyyyy.zzzzz` and consists of three parts separated by dots:

1.  **Header**: Describes *how* the token is signed (e.g., Algorithm: HS256, Type: JWT).
2.  **Payload (Data)**: The actual data you want to store (e.g., `user_id`, `email`). *Note: This is readable by anyone, so never put passwords here.*
3.  **Signature**: A cryptographic signature generated using the Header, Payload, and a **Secret Key** (stored only on your server). This ensures the token hasn't been tampered with.

## 2. The "Why Factor" (Why use JWT?)

For your **WhatsApp Order System**, JWTs are superior to traditional Sessions for several reasons:

1.  **Statelessness (Scalability)**:
    *   *Traditional Sessions*: The server must save a session ID in memory or a database for every logged-in user. If you have 10,000 users, that's 10,000 active records to manage.
    *   *JWT*: The server stores *nothing*. The token itself proves who the user is. The server just verifies the signature. This makes your backend faster and cheaper to scale.

2.  **Mobile & API Friendliness**:
    *   Your system is likely serving a frontend or a WhatsApp bot. Cookies (used in sessions) can be tricky with mobile apps or cross-domain requests. JWTs are sent in the HTTP Header (`Authorization: Bearer <token>`), which works universally across all platforms (Web, Android, iOS, Bots).

3.  **Database Efficiency**:
    *   With sessions, every time a user loads a page, you might hit the DB to look up the session ID.
    *   With JWT, you verify the math (CPU) instead of hitting the DB (Disk/Network), which is much faster.

## 3. Implementation Plan (Your Scenario)

Here is how we will verify implementation in your specific codebase:

### Step 1: Install Dependencies
We need the `jsonwebtoken` library to sign and verify tokens.
```bash
npm install jsonwebtoken
```

### Step 2: Generate a Secret Key
We need a strong secret key stored in your `.env` file to sign tokens.
*File: `.env`*
```bash
JWT_SECRET=super_secret_secure_key_123!
```

### Step 3: Create a Token Generator Utility
Instead of cluttering your controller, we create a helper function to generate tokens.
*File: `src/utils/jwtGenerator.js`*
```javascript
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user_id) => {
  const payload = {
    user: {
      id: user_id
    }
  };
  
  // Sign token, valid for 1 hour
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
```

### Step 4: Update `authController.js`
Modify your `register` and `login` functions to return this token.

*   **Registration**: Immediately log the user in by sending a token after sign-up.
*   **Login**: Verify password, then send a token.

**Before:**
```javascript
return res.json({ message: "Login successful", user: ... });
```
**After:**
```javascript
const token = generateToken(user.id);
return res.json({ token, message: "Login successful" });
```

### Step 5: Create Authentication Middleware
Create middleware to protect private routes (like placing an order).
*File: `src/middleware/authorization.js`*
```javascript
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
  try {
    // 1. Get token from header
    const jwtToken = req.header("token"); 

    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    // 2. Verify token
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // 3. Add user info to request object
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};
```

### Step 6: Protect Routes
Apply the middleware to routes in `routes/orders.js`.
```javascript
import authorization from "../middleware/authorization.js";

// Now, only logged-in users can see/add orders
router.post("/", authorization, addOrders);
```

## Summary of Flow
1.  **User logs in** -> Server sends **JWT**.
2.  **User wants to order** -> Client sends **JWT** in header.
3.  **Server Middleware** -> Checks signature -> Allows/Denies access.
