import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoute from "./routes/AppRoute";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
);
