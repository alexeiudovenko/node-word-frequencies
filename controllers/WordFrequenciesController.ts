import { Request, Response, NextFunction } from "express";
import { countWordsAlgo, maxCountOfWords } from "../utils/wordsAlgorithm";

const WordFrequenciesController = {
  async process(req: Request, res: Response, next: NextFunction) {
    const errors: string[] = [];
    let wordsMap = {};
    let maxCountOfWordsMap = {};
    let maxCount = 0;

    req.busboy.on("field", (_, value) => {
      if (!Number.isInteger(+value)) {
        errors.push("Wrong count value (not an integer number)");
      }
      maxCount = Number(value);
    });

    req.busboy.on("file", (_, file) => {
      if (errors.length > 0) {
        req.unpipe(req.busboy);
        return res.status(400).json({ message: errors });
      }

      file.on("data", (data) => {
        countWordsAlgo(data.toString("utf8"), wordsMap);
      });

      file.on("end", function () {
        maxCountOfWordsMap = maxCountOfWords(wordsMap, maxCount);
      });
    });

    req.pipe(req.busboy);

    req.busboy.on("finish", function () {
      res.json(maxCountOfWordsMap);
    });
  },
};

export default WordFrequenciesController;
