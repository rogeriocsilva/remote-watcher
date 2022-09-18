import express, { Request, Response } from "express";
import { isAuthenticated } from "../../middlewares";
import { findUserById } from "../services/users.services";
import pick from "lodash.pick";

const router = express.Router();

router.get(
  "/profile",
  isAuthenticated,
  async (req: Request, res: Response, next) => {
    try {
      const { userId } = req.body;
      const user = await findUserById(userId);
      if (user) {
        const dto = pick(user, ["id", "email"]);
        res.json(dto);
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
