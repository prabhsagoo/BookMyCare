import express, { request, response } from "express";
import { user } from "./MongoDB.js";
export const routerGetData = express.Router();


//Displaying all data
routerGetData.get("/", async (request, response) => {
  response.send(await user.find({},"-_id -__v"));
});

//Registration
routerGetData.post("/add", async (request, response) => {
  const newData = request.body;
  let existingUser = await user.find({ email: newData.email.toLowerCase() });
  if (existingUser == "") {
    if (!newData.name) {
      response.send("Please enter your Name:");
    } else if (!newData.email) {
      response.send("Please enter your Email:");
    } else if (!newData.pwd) {
      response.send("Please enter your Password:");
    } else if (!newData.mobile) {
      response.send("Please enter your Mobile number:");
    } else {
      const addData = new user({
        name: newData.name,
        email: (newData.email).toLowerCase(),
        pwd: newData.pwd,
        mobile: newData.mobile,
      });
      addData.save();
      response.send(`Registration Successful\n Hello ${newData.name}, Welcome to BookMyCare!!!`);
    }
  } else {
    response.send("The account already exist.");
  }
});

//Deleting a record
routerGetData.delete("/delete", async (request, response) => {
  const newData = request.body;
  let existingUser = await user.find({ email: newData.email.toLowerCase() });
  if (existingUser == "") {
    response.send("Account doesn't exist");
  } else {
    user.collection.deleteOne({ email: newData.email.toLowerCase() });
    response.send("The record has been deleted!!!");
  }
});

//updating a record:
routerGetData.patch("/update", async (request, response) => {
  const newData = request.body;
  let existingUser = await user.find({ email: newData.email.toLowerCase() });
  if (existingUser == "") {
    response.send("Account doesn't exist");
  } else {
    user.collection.updateOne(
      {
        email: newData.email.toLowerCase(),
      },
      { $set: { name: newData.name } }
    );
    response.send("The record has been updated!!!");
  }
});