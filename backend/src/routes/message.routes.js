import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, (req, res, next) => {
    console.log("Fetching messages for ID:", req.params.id);
    next();
  }, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
