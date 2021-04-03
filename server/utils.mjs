import fs from "fs";
import { join } from "path";

import jose from "node-jose";

const { JWK } = jose;

export const addToKeyStore = async (req, res) => {
  const { body } = req;
  if (body?.key) {
    try {
      const { keystore, keystoreFile } = req.app.locals.store;
      const alreadyInStore = await keystore.get(body?.key?.kid);
      if (alreadyInStore == null) {
        await keystore.add(body?.key);
        await fs.writeFileSync(
          keystoreFile,
          JSON.stringify(keystore.toJSON(true))
        );
        res.status(200);
        res.send("Success");
        return;
      } else {
        res.status(400);
        res.send("Duplicated key");
        return;
      }
    } catch (error) {
      console.log({ error });
      res.status(400);
      res.send(error);
      return;
    }
  } else {
    res.status(400);
    res.send("No key found");
  }
};

export async function startKeyStore(app) {
  const certDir = ".cert";
  const keystoreFile = join(certDir, "keystore.json");

  let keystore = JWK.createKeyStore();

  if (!fs.existsSync(keystoreFile)) {
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir);
    }
    fs.writeFileSync(keystoreFile, JSON.stringify(keystore.toJSON(true)));
  } else {
    const ks = fs.readFileSync(keystoreFile);
    keystore = await JWK.asKeyStore(ks.toString());
  }

  app.locals.store = {
    keystore,
    keystoreFile,
  };
}
