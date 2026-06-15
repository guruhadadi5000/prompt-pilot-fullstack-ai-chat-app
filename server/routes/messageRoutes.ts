import express from "express";
import { protect } from "../middlewares/auth";
import {
  imageMessageController,
  textMessageController,
} from "../controllers/messageController";

const messageRouter = express.Router();

messageRouter.post("/text", protect, textMessageController);
messageRouter.post("/image", protect, imageMessageController);

export default messageRouter;
