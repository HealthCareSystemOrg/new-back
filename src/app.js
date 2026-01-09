import express from "express";
import "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import appointmentRoutes from "./routes/appointment.routes.js";
import detailsRoutes from "./routes/Details.route.js";
import deleteRoutes from "./routes/delete.routes.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/details", detailsRoutes);
app.use("/api/delete", deleteRoutes);
app.get("/", (req, res) => {
  res.send("Health Care System Backend is running");
});

export default app;
