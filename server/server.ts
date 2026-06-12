import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db";
import userRouter from "./routes/userRouter";
const app = express();

app.use(express.json());
dotenv.config();
await connectDB();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
