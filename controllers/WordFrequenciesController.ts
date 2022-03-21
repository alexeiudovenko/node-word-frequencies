import { Request, Response, NextFunction } from "express";
import { countWordsAlgo, maxCountOfWords } from "../utils/wordsAlgorithm";
import workerpool from "workerpool";

const WordFrequenciesController = {
  async process(req: Request, res: Response, next: NextFunction) {
    const pool = workerpool.pool();
    const errors: string[] = [];
    let wordsMaps: Record<string, number>[] = [];
    let maxCountOfWordsMap = {};
    let maxCount = 0;
    let dataBuffer: Buffer[] = [];
    let buffersCount = 0;
    let restText = "";
    let [currentTextProcessedCount, textesToProcessCount] = [0, 0];

    const handleDataReadingEnd = () => {
      if (currentTextProcessedCount !== textesToProcessCount) {
        setTimeout(handleDataReadingEnd, 200); // wait 200 millisecnds then recheck
        return;
      }
      if (dataBuffer.length > 0) {
        pool
          .exec(countWordsAlgo, [
            restText.concat(Buffer.concat(dataBuffer).toString("utf8")),
          ])
          .then((res) => wordsMaps.push(res))
          .catch((err) => next(err))
          .then(() => {
            maxCountOfWordsMap = maxCountOfWords(wordsMaps, maxCount);
            pool.terminate(); // terminate all workers when done
            res.json(maxCountOfWordsMap);
          });
        dataBuffer = [];
      } else {
        maxCountOfWordsMap = maxCountOfWords(wordsMaps, maxCount);
        res.json(maxCountOfWordsMap);
      }
    };

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
        // 100 - could be customizable
        if (buffersCount % 100 === 0) {
          textesToProcessCount++;
          let textFragment = restText.concat(
            Buffer.concat(dataBuffer).toString("utf8")
          );

          const lastIdx = textFragment.lastIndexOf(".");
          // When we are reading stream (utf-8) we may break some words, thus
          // algorithm won't work properly
          // restText is used to fix this issue
          restText = textFragment.slice(lastIdx + 1);
          pool
            .exec(countWordsAlgo, [textFragment.slice(0, lastIdx + 1)])
            .then((res) => {
              currentTextProcessedCount++;
              wordsMaps.push(res);
            })
            .catch((err) => next(err));
          dataBuffer = [];
        }
        buffersCount++;
        dataBuffer.push(data);
      });

      file.on("end", handleDataReadingEnd);
    });

    req.pipe(req.busboy);
  },
};

export default WordFrequenciesController;
