import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: { id: string }) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const generateRefreshToken = (payload: { id: string }) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
