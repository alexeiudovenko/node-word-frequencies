import express, { Request, Response } from "express";
import WordFrequenciesController from "./controllers/WordFrequenciesController";

const router = express.Router();

router.post("/word-frequencies", WordFrequenciesController.process);

export default router;
