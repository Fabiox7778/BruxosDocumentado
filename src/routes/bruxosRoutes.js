import express from "express";
import { getBruxosById, getAllBruxos, createBruxo, deleteBruxo } from "../controller/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos); 
router.get("/:id", getBruxosById);
router.post("/", createBruxo);
router.delete("/:id", deleteBruxo)

export default router;