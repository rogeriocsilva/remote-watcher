import express from "express";
import { Request, Response } from "express";

import auth from "./routes/auth.routes";
import users from "./routes/users.routes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth/", auth);
router.use("/users/", users);

export default router;
