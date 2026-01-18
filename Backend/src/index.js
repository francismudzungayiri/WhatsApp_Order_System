import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

router.get("/status", (req, res) => {
  res.json({ status: "OK" });
});

// Mount router
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
