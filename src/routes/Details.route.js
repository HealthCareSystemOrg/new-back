import express from "express";
import { getStatus } from "../controllers/GetStatus.js";
const router = express.Router();

router.get("/dashboardstats", getStatus);

export default router;
