import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  query: {
    userId: localStorage.getItem("userId"), // or however you get current user ID
  },
  withCredentials: true,
});

export default socket;
