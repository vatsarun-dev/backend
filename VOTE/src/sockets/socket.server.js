import { Server } from "socket.io";
import httpServer from "../../server.js";

const voteCount = {};

const vote = [];

export default function initSocket(httpServer) {
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("socket is connected successfully");

    // IT WILL GET THE ROOM NAME FROM FRONTEND

    const { room } = socket.handshake.query;
    console.log(`your room is connected : ${room}`);

    // IT WILL CREATE THE ROOM IF THERE IS NO ROOM AND JOIN IF ROOM IS EXISTING

    socket.join(room);

    // IT COUNTS THE ROOM YES OR NO SAPERATELY

    if (!voteCount[room]) voteCount[room] = { yes: 0, no: 0 };
    console.log(voteCount[room]);

    // THIS CUSTOM ACTION IS USED TO COUNT THE YES
    socket.on("yes-btn", () => {
      // THIS CHECK IS TO BE ENSURE THAT ONE USER CAN ONLY VOTE ONLY ONE TIME

      if (vote.includes(socket.id)) return;
      voteCount[room].yes += 1;

      // THIS EMIT ACTION FIRE IS USED TO DISPLAY THE ALL VOTE COUNT TO WHOM WHOSE ARE CONNECTED WITH THAT ROOM

      io.to(room).emit("vote_update", voteCount[room]);

      vote.push(socket.id);
    });

    // THIS CUSTOM ACTION IS USED TO COUNT THE YES

    socket.on("no-btn", () => {
      if (vote.includes(socket.id)) return;
      voteCount[room].no += 1;
      io.to(room).emit("vote_update", voteCount[room]);
      vote.push(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("socket is disconnect");
    });
  });
}
