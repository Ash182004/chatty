import express from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // ✅ protected
router.get("/:id", protectRoute, getMessages);           // ✅ protected
router.post("/:id", protectRoute, sendMessage);          // ✅ protected

export default router;
