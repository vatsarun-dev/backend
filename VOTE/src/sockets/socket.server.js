import { Server } from "socket.io";
import httpServer from "../../server.js";

const voteCount = {
  yes: 0,
  no: 0,
};

const vote = [];

export default function initSocket(httpServer) {
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("socket is connected successfully");
    // THIS CUSTOM ACTION IS USED TO COUNT THE YES
    socket.on("yes-btn", () => {
      // THIS CHECK IS TO BE ENSURE THAT ONE USER CAN ONLY VOTE ONLY ONE TIME
      if (vote.includes(socket.id)) return;
      voteCount.yes += 1;

      vote.push(socket.id);
      // THIS EMIT ACTION FIRE IS USED TO DISPLAY THE ALL VOTE COUNT
      io.emit("vote-display", voteCount);
    });

    // THIS CUSTOM ACTION IS USED TO COUNT THE YES

    socket.on("no-btn", () => {
      if (vote.includes(socket.id)) return;
      voteCount.no += 1;
      vote.push(socket.id);

      io.emit("vote-display", voteCount);
    });

    socket.on("disconnect", () => {
      console.log("socket is disconnect");
    });
  });
}
