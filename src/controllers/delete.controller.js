import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import Appointment from "../models/appointment.js";

export const deleteDoctor = async (req, res) => {
  console.log("requast is come", req.params.id);
  try {
    console.log("erreo is there");
    let doctor = await Doctor.findOne({ doctorId: req.params.id });

    console.log(doctor);
    if (!doctor) {
      doctor = await Doctor.findOne({ user: req.params.id });
    }
    console.log(doctor);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await Doctor.deleteOne({ _id: doctor._id });

    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePatient = async (req, res) => {
  try {
    let patient = await Patient.findOne({ patientId: req.params.id });

    if (!patient) {
      patient = await Patient.findOne({ user: req.params.id });
    }

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await Patient.deleteOne({ _id: patient._id });

    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findOne({
      appointmentId: req.params.id,
    });

    if (!appointment) {
      appointment = await Appointment.findById(req.params.id);
    }

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.deleteOne({ _id: appointment._id });

    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
