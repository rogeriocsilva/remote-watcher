import bcrypt from "bcrypt";
import { db } from "../../utils/db";

type NewUserParams = {
  email: string;
  password: string;
};

function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user: NewUserParams) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export { findUserByEmail, findUserById, createUserByEmailAndPassword };
