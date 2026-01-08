import express from "express";
import "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Health Care System Backend is running");
});

export default app;
