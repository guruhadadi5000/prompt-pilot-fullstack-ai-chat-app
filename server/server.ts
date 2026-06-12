import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
