import express from "express";
import jose from "node-jose";

import jwkToPem from "jwk-to-pem";
import jwt from "jsonwebtoken";

const { JWS } = jose;
const joseRouter = express.Router();

const routerMiddleware = async (req, res, next) => {
  if (req?.method === "POST") {
    if (req?.body?.token) {
      try {
      const { keystore } = req.app.locals.store;

        const v = await JWS.createVerify(keystore).verify(req?.body?.token);

        if (v) {
          const newKey = keystore.get(v.header.kid);
          const publicKey = jwkToPem(newKey.toJSON());
          const decoded = jwt.verify(req?.body?.token, publicKey);

          req.decoded = decoded;
          next();
        } else {
          res.status(401);
          res.send("Invalid token");
        }
      } catch (err) {
        console.log({ err });
        res.status(401);
        res.send("Invalid token");
      }
    } else {
      res.status(400);
      res.send("No token found");
    }
  } else {
    next();
  }
};

joseRouter.use(routerMiddleware);

joseRouter.post("/report/", (req, res) => {
  res.send(req.decoded);
});


export default joseRouter;
