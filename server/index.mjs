import express from "express";
import { startKeyStore, addToKeyStore } from "./utils.mjs";
import joseRouter from "./router.mjs";

const app = express();
const port = 4000;

startKeyStore(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", joseRouter);
app.post("/device/", addToKeyStore);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
