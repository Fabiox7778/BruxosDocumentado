import express from "express";
import { getBruxosById, getAllBruxos, createBruxo, deleteBruxo, updateBruxo } from "../controller/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos); 
router.get("/:id", getBruxosById);
router.post("/", createBruxo);
router.delete("/:id", deleteBruxo);
router.put("/:id", updateBruxo);

export default router;