import express, { json } from "express";
import { routerGetData } from "./getData.js";
import { router } from "./login.js";
import { routerAppointment } from "./appointment.js";

const app = express();
const PORT = 5150;
app.use(express.json());
app.use("/login", router); // login.js
app.use("/data", routerGetData); //getData.js
app.use("/appointment", routerAppointment);

app.get("/", (request, response) => {
  response.send(
    "Welcome to BookWalk\n\n Get the Care You Need on Your Schedule: Book Appointments for Walk-in Clinics with Ease."
  );
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
