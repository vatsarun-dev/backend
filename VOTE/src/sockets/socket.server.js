import { Server } from "socket.io";
import httpServer from "../../server.js";

const voteCount = {
  yes: 0,
  no: 0,
};

export default function initSocket(httpServer) {
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("socket is connected successfully");
    // THIS CUSTOM ACTION IS USED TO COUNT THE YES
    socket.on("yes-btn", () => {
      voteCount.yes += 1;
      // THIS EMIT ACTION FIRE IS USED TO DISPLAY THE ALL VOTE COUNT
      io.emit("vote-display", voteCount);
    });

    // THIS CUSTOM ACTION IS USED TO COUNT THE YES

    socket.on("no-btn", () => {
      voteCount.no += 1;

      io.emit("vote-display", voteCount);
    });

    socket.on("disconnect", () => {
      console.log("socket is disconnect");
    });
  });
}
