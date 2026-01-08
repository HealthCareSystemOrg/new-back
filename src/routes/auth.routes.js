import express from "express";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.Login.js";
import { assignDoctorAndRoom } from "../controllers/asignPatiant.js";
import {
  getPatients,
  getPatientById,
} from "../controllers/patient.controller.js";
import { getDoctorById, getDoctors } from "../controllers/getDoctors.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/patients/", getPatients);
router.get("/patients/:id", getPatientById);
router.put("/:patientId", assignDoctorAndRoom);
router.get("/doctor/:id", getDoctorById);
router.get("/doctors", getDoctors);

export default router;
