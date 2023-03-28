import express, { request, response } from "express";
import { appointment, user, book } from "./MongoDB.js";
export const routerAppointment = express.Router();

// Available appointments
routerAppointment.get("/avail", async (req, res) => {
  res.send(await appointment.find({ isAvailable: "true" }, "-_id -__v"));
});
// Booked appointments
routerAppointment.get("/booked", async (req, res) => {
  res.send(await book.find({}, "-_id -__v"));
});

// Add new appointments
routerAppointment.post("/add", async (req, res) => {
  const newAppointment = new appointment({
    date: req.body.date,
    time: req.body.time,
    isAvailable: req.body.isAvailable,
  });
  await newAppointment.save();
  res.send(
    `The new appointment for ${req.body.date} at ${req.body.time} has been added!`
  );
});

// Book a Appointment
routerAppointment.post("/book", async (req, res) => {
  const userData = await user.find({ email: req.body.email.toLowerCase() });

  const data = await appointment.findOneAndUpdate(
    {
      date: req.body.date,
      time: req.body.time,
    },
    {
      $set: {
        isAvailable: false,
      },
    }
  );
  if (userData != "") {
    if (data == null||data.isAvailable == false) {
      res.send(
        `Hi ${userData[0].name}, There is no appointment available for ${req.body.date} at ${req.body.time}!`
      );
    } else {
      const bookAppointment = new book({
        name: userData[0].name,
        email: req.body.email.toLowerCase(),
        mobile: userData[0].mobile,
        date: req.body.date,
        time: req.body.time,
      });
      await bookAppointment.save();
      res.send(
        `Hi ${userData[0].name}, Your appointment for ${req.body.date} at ${req.body.time} has been booked!`
      );
    }
  } else {
    res.send("You must create an account first!");
  }
});
