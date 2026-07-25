import createApp from "./src/app.js";
import connectDB from "./src/database/db.js";
import logger from "./src/config/logger.js";
import env from "./src/config/env.js";
(function startServer() {
  connectDB()
    .then(() => {
      createApp().listen(3000, () => {
        logger.info({ port: env.PORT }, "your app is running");
      });
    })
    .catch((error) => {
      logger.error({ error: error }, "there is an error while connection");
    });
})();
// this is the IIFE which is use for immediately invoke a function