// src/middleware/requireStrongPassword.js
import { validatePassword } from "../security/passwordPolicy.js";

export function requireStrongPassword(options = {}) {
  const { field = "password", getUserInputs = () => [] } = options;

  return (req, res, next) => {
    const password = req.body[field];
    const userInputs = getUserInputs(req);

    const result = validatePassword(password, userInputs);

    if (!result.ok) {
      return res.status(400).json({
        message: result.message,
        suggestions: result.suggestions,
      });
    }

    next();
  };
}
