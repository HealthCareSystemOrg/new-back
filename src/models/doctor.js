import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: { type: String, unique: true },
    name: { type: String, required: true },
    assignedPatients: [
      {
        type: String,
      },
    ],
    specialization: String,
    experience: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
