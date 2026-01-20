import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
const router = express.Router();

//API ROutes
router.get("/home", (req, res) => {
  res.send("Hello, World!");
});

// Add user route
router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// add orders route
router.post("/orders", async (req, res) => {
  const { customer_name, phone_number, items, total_price, status } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO orders (customer_name, phone_number, items, total_price, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [customer_name, phone_number, items, total_price, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// retrieve all orders route
router.get("/orders", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM orders");
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/status", (req, res) => {
  res.json({ status: "OK" });
});

// Mount router
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
