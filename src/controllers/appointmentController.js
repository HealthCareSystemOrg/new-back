import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";

const generateAppointmentId = async () => {
  const last = await Appointment.findOne().sort({ createdAt: -1 });

  if (!last || !last.appointmentId) return "A001";

  const num = parseInt(last.appointmentId.slice(1)) + 1;
  return `A${num.toString().padStart(3, "0")}`;
};

export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, reason } = req.body;

    if (!patientId || !doctorId || !date) {
      return res.status(400).json({ message: "All fields required" });
    }
    const patient = await Patient.findOne({ patientId: patientId });
    const doctor = await Doctor.findOne({ doctorId: doctorId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const appointmentId = await generateAppointmentId();
    const appointment = await Appointment.create({
      appointmentId,
      patientId,
      doctorId,
      date,
      reason,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getAppointmentsByPatient = async (req, res) => {
  const appointments = await Appointment.find({
    patientId: req.params.patientId,
  });
  res.json(appointments);
};

export const getAppointmentsByDoctor = async (req, res) => {
  const appointments = await Appointment.find({
    doctorId: req.params.doctorId,
  });
  res.json(appointments);
};
