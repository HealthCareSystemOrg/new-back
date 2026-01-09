import express from "express";
import {
  createAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
} from "../controllers/appointmentController.js";
import { getAppointments } from "../controllers/getAppointments.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/patient/:patientId", getAppointmentsByPatient);
router.get("/doctor/:doctorId", getAppointmentsByDoctor);
router.get("/", getAppointments);

export default router;
