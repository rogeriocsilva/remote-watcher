import crypto from "crypto";

function generateCode() {
  const first = crypto.randomBytes(2).toString("hex");
  const second = crypto.randomBytes(2).toString("hex").slice(0, 3);
  return `${first}-${second}`;
}

export default generateCode;
