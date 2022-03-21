import express from "express";
import busboy from "connect-busboy";
import router from "./router";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  busboy({
    highWaterMark: 200 * 1024 * 1024, // Set 4MB buffer
    limits: {
      // we are not throwing an error, when we reaching the limit
      // rather, we stop reading the file and show results, after reaching the limit
      fileSize: 1024 * 1024 * 1024, // 1GB,
    },
  })
);

app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
