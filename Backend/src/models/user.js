import pool from "../config/db.js";

const User = {
  // Find user by email
  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    return result.rows[0] || null;
  },

  //create a new user
  async createNewUser({ name, email, passwordHash }) {
    const result = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
      [name, email, passwordHash]
    );
    return result.rows[0];
  },

  // Find user by ID
  async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    return result.rows[0] || null;
  },
};

export default User;
