import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.params.id });

    if (!doctor) {
      doctor = await Doctor.findOne({ doctorId: req.params.id });
    }

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patients = await Patient.find(
      { patientId: { $in: doctor.assignedPatients } },
      "patientId name age disease status roomNo"
    );

    res.json({
      ...doctor.toObject(),
      assignedPatientDetails: patients,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  console.log("Fetching doctors with pagination:", req.query);
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find().skip(skip).limit(limit);

    const total = await Doctor.countDocuments();

    const doctorsWithPatients = await Promise.all(
      doctors.map(async (doctor) => {
        const patients = await Patient.find(
          { patientId: { $in: doctor.assignedPatients } },
          "patientId name age disease status roomNo"
        );

        return {
          ...doctor.toObject(),
          assignedPatientDetails: patients,
        };
      })
    );

    res.json(doctorsWithPatients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
