import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../utils/db";
import generateCode from "../../utils/generateCode";
import hashToken from "../../utils/hashToken";

import { generateTokens } from "../../utils/jwt";

const DEFAULT_DEVICE_CODE_TIMEOUT = 1800;

type FindTokenParams = {
  deviceCode: string;
  clientId: string;
};

type ActivateTokenParams = {
  deviceCode: string;
  clientId: string;
  userCode: string;
  userId: string;
};

type AddRefreshParams = {
  jti: string;
  refreshToken: string;
  userId: string;
};

async function generateAuthTokens(user: User) {
  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(user, jti);
  await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
  return { accessToken, refreshToken };
}

// used when we create a refresh token.
function addRefreshTokenToWhitelist({
  jti,
  refreshToken,
  userId,
}: AddRefreshParams) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id: string) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(id: string) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

function revokeTokens(userId: string) {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

function generateDeviceToken(clientId: string) {
  return db.deviceToken.create({
    data: {
      userCode: generateCode().toUpperCase(),
      clientId,
      expiresIn: DEFAULT_DEVICE_CODE_TIMEOUT,
    },
  });
}

function activateDeviceToken({
  deviceCode,
  clientId,
  userCode,
  userId,
}: ActivateTokenParams) {
  return db.deviceToken.updateMany({
    where: {
      AND: [{ deviceCode }, { clientId }, { userCode }, { expired: false }],
    },
    data: {
      userId: userId,
    },
  });
}

function getDeviceTokenById({ deviceCode, clientId }: FindTokenParams) {
  return db.deviceToken.findFirstOrThrow({
    where: {
      AND: [{ deviceCode }, { clientId }],
    },
  });
}

export {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
  generateAuthTokens,
  generateDeviceToken,
  activateDeviceToken,
  getDeviceTokenById,
};
