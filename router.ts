import express, { Request, Response } from "express";
import WordFrequenciesController from "./controllers/WordFrequenciesController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ msg: "HELLO, WORLD!" });
});

router.post("/word-frequencies", WordFrequenciesController.process);

export default router;