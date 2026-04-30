import express from "express";
import { sendMessage, getMessages } from "../controllers/contactController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", protect, getMessages);

export default router;