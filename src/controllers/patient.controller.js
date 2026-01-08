import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.params.id }).populate(
      "user",
      "name email"
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    let doctor = null;

    if (patient.doctorAssigned) {
      doctor = await Doctor.findOne(
        { doctorId: patient.doctorAssigned },
        "doctorId name specialization experience"
      );
    }

    res.json({
      ...patient.toObject(),
      doctorAssignedDetails: doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const patients = await Patient.find()
      .skip(skip)
      .limit(limit)
      .populate("user", "name email");

    const total = await Patient.countDocuments();

    const patientsWithDoctors = await Promise.all(
      patients.map(async (patient) => {
        let doctor = null;

        if (patient.doctorAssigned) {
          doctor = await Doctor.findOne(
            { doctorId: patient.doctorAssigned },
            "doctorId name specialization experience"
          );
        }

        return {
          ...patient.toObject(),
          doctorAssignedDetails: doctor,
        };
      })
    );

    res.json({
      data: patientsWithDoctors,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
