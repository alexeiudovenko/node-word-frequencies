import express from "express";
import cors from "cors";
import router from "./router";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
