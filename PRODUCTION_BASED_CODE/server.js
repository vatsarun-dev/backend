import createApp from "./src/app.js";
import connectDB from "./src/database/db.js";
import env from "./src/config/env.js";
import logger from "./src/config/logger.js";

function startServer() {
  const app = createApp();
  connectDB()
    .then(() => {
      app.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, "your server is running ");
      });
    })
    .catch((error) => {
      logger.error({ error: error }, "there is an error while connection");
    });
}
startServer();
