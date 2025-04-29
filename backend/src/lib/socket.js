import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Setup Socket.IO with CORS configuration for both development and production
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow access from the frontend client URL
    credentials: true, // Allow credentials (cookies, etc.)
  },
});

// Store online users with userId as key and socketId as value
const userSocketMap = {}; // { userId: socketId }

// Function to get receiver's socket ID by userId
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    // Map the userId to the socketId
    userSocketMap[userId] = socket.id;
    console.log(`🔗 User ${userId} mapped to socket ${socket.id}`);
  } else {
    console.warn("⚠️ Connection attempt without userId");
  }

  // Notify all connected clients about the current online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle incoming messages from users
  socket.on("sendMessage", ({ message, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      // Send message to the receiver if they are online
      io.to(receiverSocketId).emit("newMessage", message);
      console.log(`📤 Message sent to user ${receiverId}`);
    } else {
      console.warn(`📭 User ${receiverId} is offline, cannot deliver now`);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId]; // Remove user from the online users list
    }
    // Notify all clients about the updated list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export the necessary modules
export { io, app, server };
