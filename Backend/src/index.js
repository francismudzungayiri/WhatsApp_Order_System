import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/orders.js";
import userRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
const apiVersion = express.Router();

// Mount router
apiVersion.use("/orders", router);
apiVersion.use("/users", userRouter);

app.use("/api/v1", apiVersion);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
