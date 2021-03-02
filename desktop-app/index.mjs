import si from "systeminformation";
import express from "express";
import QRCode from "qrcode";

const app = express();
const port = 80;

const generateQR = async (text) => {
  try {
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (err) {
    console.error({ err });
    return null;
  }
};

const statsToGet = {
  currentLoad: "currentLoad",
  cpuTemperature: "main, max, avg",
  graphics: "controllers",
};

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

app.get("/", async (req, res) => {
  const qr = await generateQR(req.app.locals.systemInfo);
  res.send(`<img src=${qr}>`);
});

app.get("/register", async (req, res) => {
  const qr = await generateQR(req.app.locals.systemInfo);
  res.send(qr);
});

app.get("/api/load", (req, res) => {
  si.get(statsToGet)
    .then((data) => res.send(JSON.stringify(data)))
    .catch((err) => res.send({ error: err.message }));
});

app.use(function (err, req, res, next) {
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  app.locals.systemInfo = "test"
  const qrString = await QRCode.toString(app.locals.systemInfo);
  console.log(qrString);
});
