import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";

export const getAppointmentById = async (req, res) => {
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

    const patient = await Patient.findOne(
      { patientId: appointment.patientId },
      "patientId name age disease status roomNo"
    );

    const doctor = await Doctor.findOne(
      { doctorId: appointment.doctorId },
      "doctorId name specialization experience"
    );

    res.json({
      ...appointment.toObject(),
      patientDetails: patient || null,
      doctorDetails: doctor || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAppointments = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const appointments = await Appointment.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (app) => {
        const patient = await Patient.findOne(
          { patientId: app.patientId },
          "patientId name age disease status roomNo"
        );

        const doctor = await Doctor.findOne(
          { doctorId: app.doctorId },
          "doctorId name specialization experience"
        );

        return {
          ...app.toObject(),
          patientDetails: patient || null,
          doctorDetails: doctor || null,
        };
      })
    );

    res.json(appointmentsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
