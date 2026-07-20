import createApp from "./src/app.js";
import connectDb from "./src/database/db.js";
import env from "./src/config/env.js";
import logger from "./src/config/logger.js";
const app = createApp();
function startServer() {
  connectDb()
    .then(() => {
      app.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, "your server is running");
      });
    })
    .catch((error) => logger.error("there is some error"));
}
startServer();
