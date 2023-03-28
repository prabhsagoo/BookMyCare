import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

// const moment = require('moment');
const connectionString = process.env.MONGO_URL;
const db = await mongoose.connect(connectionString);

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pwd: { type: String, required: true },
  mobile: { type: String, required: true },
  created: { type: String, default: moment().format('LLLL')},
});

export const user = db.model("regUser", usersSchema);
