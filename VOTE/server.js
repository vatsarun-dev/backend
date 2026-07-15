import app from "./src/app.js";
import initSocket from "./src/sockets/socket.server.js";
import { createServer } from "http";

const httpServer = createServer(app);
initSocket(httpServer);

httpServer.listen(3000, () => {
  console.log("your app is running on port 3000");
});

export default httpServer;
