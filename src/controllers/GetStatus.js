import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import appointment from "../models/appointment.js";

export const getStatus = async (req, res) => {
  console.log("Fetching dashboard status is come");
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppoinments = await appointment.countDocuments();
    const patientTypes = await Patient.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const Daily = {
      newPatient: await Patient.countDocuments({
        status: "New Patient",
        dateCheckIn: { $gte: today, $lt: tomorrow },
      }),
      Recoverd: await Patient.countDocuments({
        status: "Recovered",
        dateCheckIn: { $gte: today, $lt: tomorrow },
      }),
      Intreatemnt: await Patient.countDocuments({
        status: "In Treatment",
        dateCheckIn: { $gte: today, $lt: tomorrow },
      }),
    };

    const Weeckly = {
      newPatient: await Patient.countDocuments({
        status: "New Patient",
        dateCheckIn: { $gte: startOfWeek, $lt: endOfWeek },
      }),
      Recoverd: await Patient.countDocuments({
        status: "Recovered",
        dateCheckIn: { $gte: startOfWeek, $lt: endOfWeek },
      }),
      Intreatemnt: await Patient.countDocuments({
        status: "In Treatment",
        dateCheckIn: { $gte: startOfWeek, $lt: endOfWeek },
      }),
    };

    const Monthly = {
      newPatient: await Patient.countDocuments({
        status: "New Patient",
        dateCheckIn: { $gte: startOfMonth, $lt: endOfMonth },
      }),
      Recoverd: await Patient.countDocuments({
        status: "Recovered",
        dateCheckIn: { $gte: startOfMonth, $lt: endOfMonth },
      }),
      Intreatemnt: await Patient.countDocuments({
        status: "In Treatment",
        dateCheckIn: { $gte: startOfMonth, $lt: endOfMonth },
      }),
    };
    res.json({
      totalPatients,
      totalDoctors,
      totalAppoinments,
      patientTypes,
      Daily,
      Weeckly,
      Monthly,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
