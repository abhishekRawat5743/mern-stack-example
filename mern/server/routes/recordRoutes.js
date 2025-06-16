import express from "express";
import { Record } from "../models/Record.js";
export const router = express.Router();

// Fetch all records
router.get("/api/records", async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).send("Error fetching records");
  }
});

export default router;
