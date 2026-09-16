import { Router } from "express";
import { getDb } from "../db.js";

const router = Router();

router.get("/health", (_req, res) => {
  try {
    const db = getDb();
    const row = db.prepare("SELECT 1 AS ok").get() as { ok: number };
    res.json({
      status: "ok",
      database: row.ok === 1 ? "connected" : "error",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
