import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db";
import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRoutes";
import messageRouter from "./routes/messageRoutes";
const app = express();

app.use(express.json());
await connectDB();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
