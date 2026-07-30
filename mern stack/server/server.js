import cors from "cors";
import dotenv from "dotenv";
import createApp from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = createApp();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Test with Postman — frontend is NOT connected");
});
