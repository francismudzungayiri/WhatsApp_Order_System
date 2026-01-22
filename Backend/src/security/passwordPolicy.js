// src/security/passwordPolicy.js
import zxcvbn from "zxcvbn";

export function validatePassword(password, userInputs = []) {
  if (!password) {
    return { ok: false, message: "Password is required" };
  }

  if (password.length < 12) {
    return {
      ok: false,
      message: "Password must be at least 12 characters long",
    };
  }

  const result = zxcvbn(password, userInputs);

  if (result.score < 3) {
    return {
      ok: false,
      message: result.feedback.warning || "Password is too weak",
      suggestions: result.feedback.suggestions,
    };
  }

  return { ok: true };
}
