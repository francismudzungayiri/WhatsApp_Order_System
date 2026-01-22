import pool from "../config/db.js";

// add orders route
export const addOrders = async (req, res) => {
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
};

// retrieve all orders route

export const getAllOrders = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM orders");
    res.status(201).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// retrieve single order route
export const getSingleOrder = async (req, res) => {
  const order_id = Number(req.params.id);

  try {
    const result = await pool.query("SELECT * FROM orders WHERE id =$1", [
      order_id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// update order
export const updateOrder = async (req, res) => {
  const order_id = Number(req.params.id);
  if (isNaN(order_id)) return res.status(400).json({ error: "Invalid ID" });

  const body = req.body || {};

  // 1. WHITELIST FIRST
  const allowedFields = [
    "status",
    "customer_name",
    "phone_number",
    "items",
    "total_price",
  ];

  // Create a new object containing only allowed keys
  const filteredBody = {};
  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredBody[key] = req.body[key];
    }
  });

  const keys = Object.keys(filteredBody);

  // 2. CHECK LENGTH AFTER FILTERING
  // If the user sent data, but NONE of it was allowed, keys.length will be 0.
  if (keys.length === 0) {
    return res.status(400).json({ error: "No valid update fields provided" });
  }

  // 3. BUILD QUERY USING FILTERED DATA
  /***
You no longer have to write 50 different if statements for 50 different columns. 
If you add a discount_code column to your database tomorrow, this code will automatically handle 
it without you changing a single line.
  ***/
  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = Object.values(filteredBody); // Use filteredBody, not req.body

  try {
    const query = `UPDATE orders SET ${setClause} WHERE id = $${
      keys.length + 1
    } RETURNING *`;
    const result = await pool.query(query, [...values, order_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error); // Don't forget to log the actual error for yourself
    res.status(500).json({ error: "Database error" });
  }
};

// delete order

export const deleteOrder = async (req, res) => {
  const order_id = Number(req.params.id);

  try {
    const query = "DELETE FROM orders WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [order_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
};
