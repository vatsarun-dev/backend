import createApp from "./src/app/app.js";
import connectDB from "./src/database/db.js";
(function startServer() {
  connectDB()
    .then(() => {
      createApp().listen(3000, () => {
        console.log(`your app is running on port ${3000} `);
      });
    })
    .catch((error) => console.log(error));
})();
