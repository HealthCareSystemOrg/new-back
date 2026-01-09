import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, required: true, unique: true },

    patientId: { type: String, required: true },
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
    reason: String,
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
