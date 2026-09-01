import { connect } from "mongoose";
export default async function connectDB() {
  await connect("mongodb://0.0.0.0/backend");
  console.log("your database is connected");
}
