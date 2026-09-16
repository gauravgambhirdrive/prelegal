import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import { getDb, closeDb } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api", healthRouter);

getDb();

const server = app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

function shutdown() {
  console.log("\nShutting down...");
  closeDb();
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
