import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db";
import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRoutes";
import messageRouter from "./routes/messageRoutes";
import creditRouter from "./routes/creditRoutes";
import { stripeWebhooks } from "./controllers/webhooks";
const app = express();

app.use(express.json());
await connectDB();
// Stripe webhook
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks,
);
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
