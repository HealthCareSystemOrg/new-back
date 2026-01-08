import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, unique: true },

    name: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: { type: Number },

    dateCheckIn: {
      type: Date,
      required: true,
    },

    doctorAssigned: {
      type: String,
      default: null,
    },

    disease: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["New Patient", "Recovered", "In Treatment"],
      default: "New Patient",
    },

    roomNo: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
