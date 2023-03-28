import express from "express";
import { user } from "./MongoDB.js";

export const router = express.Router();

//Login

router.post("/", async (request, response) => {
  const email = request.query.email;
  const pwd = request.query.pwd;

  let existingUser = await user.find({ email: email }, "pwd email");
  console.log(existingUser);
  if (existingUser == "") {
    response.send("Account doesn't exist");
  } else {
    if ((existingUser[0].email === email) & (existingUser[0].pwd === pwd)) {
      response.send("Login successful");
    } else {
      response.send("Wrong email password combination");
    }
  }
});

