// SOCKET.IO DOESN'T COMPATABLE WITH EXPRESS SO WE HAVE TO CREATE A HTTP SERVER
import { createServer } from "http";
// WE IMPORT THE SERVER FROM SOCKET.IO
import { Server } from "socket.io";
import express from "express";

const app = express();
// WE ATTACH THE EXPRESS SERVER WITH OUR HTTP SERVER
const httpServer = createServer(app);

// THERE WE ARE CONNECTING THE HTTP SERVER WITH OUR SOCKET SERVER
const io = new Server(httpServer);

httpServer.listen(3000, () => {
  console.log("your app is connected");
});
