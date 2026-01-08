import User from "../models/users.js";
import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
import bcrypt from "bcryptjs";

const generatePatientId = async () => {
  const last = await Patient.findOne().sort({ createdAt: -1 });
  if (!last || !last.patientId) return "P001";

  const num = parseInt(last.patientId.slice(1)) + 1;
  return `P${num.toString().padStart(3, "0")}`;
};

const generateDoctorId = async () => {
  const last = await Doctor.findOne().sort({ createdAt: -1 });

  if (!last || !last.doctorId) return "D001";

  const num = parseInt(last.doctorId.slice(1)) + 1;
  return `D${num.toString().padStart(3, "0")}`;
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, adminKey, patientData, doctorData } =
      req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    if (role === "admin") {
      if (!adminKey) {
        return res.status(400).json({ message: "Admin key required" });
      }

      if (adminKey !== process.env.ADMIN_KEY) {
        return res.status(403).json({ message: "Admin creation denied" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === "patient") {
      const patientId = await generatePatientId();
      await Patient.create({
        user: user._id,
        name: user.name,
        patientId,
        ...patientData,
      });
    }

    if (role === "doctor") {
      const doctorId = await generateDoctorId();
      await Doctor.create({
        user: user._id,
        name: user.name,
        doctorId,
        ...doctorData,
      });
    }

    res.status(201).json({
      message: `${role} registered successfully`,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
