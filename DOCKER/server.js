import createApp from "./src/app.js";

(function startServer() {
  createApp().listen(3000, () => console.log("your app is running "));
})();
