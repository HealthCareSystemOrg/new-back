import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";

export const assignDoctorAndRoom = async (req, res) => {
  try {
    const { doctorId, roomNo } = req.body;
    const { patientId } = req.params;

    if (!doctorId || !roomNo) {
      return res.status(400).json({
        message: "Doctor ID and room number are required",
      });
    }

    const patient = await Patient.findOne({ patientId: patientId });
    if (!patient) {
      console.log("Patient not found for ID:", patientId);
      return res.status(404).json({ message: "Patient not found" });
    }

    const doctor = await Doctor.findOne({ doctorId: doctorId });
    if (!doctor) {
      console.log("Doctor not found for ID:", doctorId);
      return res.status(404).json({ message: "Doctor not found" });
    }

    patient.doctorAssigned = doctor.doctorId;
    patient.roomNo = roomNo;

    await patient.save();

    if (!doctor.assignedPatients.includes(patient.patientId)) {
      doctor.assignedPatients.push(patient.patientId);
      await doctor.save();
    }

    res.json({
      message: "Doctor and room assigned successfully",
      patient,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
