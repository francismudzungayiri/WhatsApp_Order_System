# WhatsApp Order Capture System (WOCS)

## The Problem

Small food businesses often lose track of sales because they operate entirely through WhatsApp. Manual bookkeeping is slow, prone to error, and makes it impossible to calculate daily revenue or track order progress (New → Preparing → Delivered) in real-time.

## The Solution

WOCS is a minimalist Full-Stack ERP designed to bridge the gap between messy WhatsApp chats and structured business data. It allows business owners to manually "capture" WhatsApp orders into a centralized dashboard for tracking, reporting, and management.

## 🚀 Key Features

- **Order Digitization**: Transform unstructured WhatsApp text into structured database entries.
- **Real-time Dashboard**: Instant calculation of daily revenue and order volume.
- **Workflow Management**: Status tracking for kitchen and delivery stages.
- **Secure Access**: JWT-based authentication to protect business financial data.
- **Mobile First**: Optimized for the business owner who manages operations from their smartphone.

## 🛠️ Tech Stack

- **Frontend**: React.js (State management & UI)
- **Backend**: Node.js / Express.js (RESTful API & Logic)
- **Database**: PostgreSQL (Relational data integrity)
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: [e.g., Render / Railway / Vercel]

## 🏗️ Architecture

The system follows a classic Client-Server-Database architecture:

- **React Frontend** communicates with a protected API via Axios.
- **Express API** handles business logic (status updates, revenue aggregation).
- **PostgreSQL** ensures that order history and financial records are persistent and relational.

## 📈 12-Day Sprint Roadmap

- **Phase 1**: API Design & Database Schema
- **Phase 2**: Authentication & Security
- **Phase 3**: Frontend Dashboard & State Integration
- **Phase 4**: Deployment & Production Hardening

## 💻 Installation & Setup

1. Clone the repo:
   ```bash
   git clone [your-repo-link]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Run locally:
   ```bash
   npm run dev
   ```

## 🛡️ Challenges Overcome

- **State Consistency**: Ensuring the UI reflects database changes instantly without unnecessary re-renders.
- **Data Validation**: Implementing strict backend validation to prevent "dirty data" (e.g., negative prices or empty orders).
- **Deployment**: Managing CORS and environment variables across multiple hosting platforms.

## 📅 Daily Progress Log

### Day 1: Project Initialization & API Foundation

- **Focus**: Setting up the project structure and basic server.
- **Accomplished**:
  - Initialized Git repository.
  - Set up Backend structure using Node.js & Express.
  - Created basic API endpoints (`/api/v1/home`, `/api/v1/status`).
  - Configured environment variables (dotenv) and CORS.
  - Fixed trailing slash routing issue in `index.js`.

### Day 2: Database Integration & First Order Endpoint

- **Focus**: Connect PostgreSQL and create the first working order capture endpoint.
- **Accomplished**:
  - Installed `pg` dependency for PostgreSQL connection.
  - Created `backend/src/config/db.js` with connection pooling.
  - Built `POST /api/orders` endpoint to write orders to database.
  - Built `GET /api/v1/orders` endpoint to get order from database.
  - Built `POST /api/v1/user` endpoint to write users to database.
  - Tested endpoint in Postman with sample order data.
  - Verified order records persist in PostgreSQL.
  - **Definition of Done Met**: Order data successfully captured and stored.

### Day 3: Backend CRUD Completion & REST API Endpoints

- **Focus**: Build fully functional REST API for orders with complete CRUD operations.
- **Accomplished**:
  - Implemented `GET /api/orders` endpoint to retrieve all orders with structured response.
  - Implemented `GET /api/orders/:id` endpoint with 404 error handling for missing records.
  - Implemented `PUT /api/orders/:id` endpoint with status validation (NEW, PREPARING, DELIVERED, CANCELLED).
  - Implemented `DELETE /api/orders/:id` endpoint with confirmation response.
  - Added input validation for status updates (400 error on invalid values).
  - Tested all endpoints in Postman with various scenarios (valid IDs, missing records, invalid statuses).
  - Verified response contracts match specification exactly.
  - **Definition of Done Met**: Backend API fully functional with CRUD operations and proper error handling.
