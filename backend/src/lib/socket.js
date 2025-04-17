import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// Used to store online users
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`🔗 User ${userId} mapped to socket ${socket.id}`);
  }

  // Emit the online users list to the newly connected user
  socket.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Emit online users list to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // 📩 Listen for sent messages and forward them
  socket.on("sendMessage", ({ message, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
      console.log(`📤 Message sent to user ${receiverId}`);
    } else {
      console.log(`📭 User ${receiverId} is offline, cannot deliver now`);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
