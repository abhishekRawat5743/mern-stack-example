import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5050;
const app = express();
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "https://employeerecord-bdeehffccpg8d8gv.westeurope-01.azurewebsites.net", // production frontend
  "https://employeerecord-staging-b0fwgxb4cnaqayeg.westeurope-01.azurewebsites.net", // staging frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no-origin requests (e.g., curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
