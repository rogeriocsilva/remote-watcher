import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user: User) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "5m",
  });
}

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
function generateRefreshToken(user: User, jti: string) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "8h",
    }
  );
}

function generateTokens(user: User, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}
export { generateAccessToken, generateRefreshToken, generateTokens };
