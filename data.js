import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URL;
const db = await mongoose.connect(connectionString);

const usersSchema = new mongoose.Schema({
  userName: String,
  email: String,
});

export async function getLogin() {
  const user = db.model("regUser", usersSchema);
  const users = await user.find().then((result) => {
    console.log(result);
  });
  // return users;
}

export function addData(data) {
  console.log(data);
  users.push(data);
}
