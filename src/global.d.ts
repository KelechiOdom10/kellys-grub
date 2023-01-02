import { IUser } from "./models/userModel";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      MONGO_URI_DEV: string;
      MONGO_URI_PROD: string;

      CLIENT_URL_DEV: string;
      CLIENT_URL_PROD: string;

      SERVER_URL_DEV: string;
      SERVER_URL_PROD: string;

      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;

      EMAIL_SERVICE: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
      EMAIL_FROM: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CALLBACK_URL: string;

      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
      FACEBOOK_CALLBACK_URL: string;

      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      CLOUDINARY_NAME: string;
    }
  }

  namespace Express {
    interface User extends IUser {}
  }
}

export {};
