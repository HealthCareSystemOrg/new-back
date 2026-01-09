import express from "express";
import {
  deletePatient,
  deleteDoctor,
  deleteAppointment,
} from "../controllers/delete.controller.js";

const router = express.Router();

router.delete("/patient/:id", deletePatient);
router.delete("/doctor/:id", deleteDoctor);
router.delete("/appointment/:id", deleteAppointment);

export default router;
