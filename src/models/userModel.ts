import { Schema, model, Document } from "mongoose";
import { EMAIL_PROVIDER } from "~/constants";

export interface IUser {
  provider: string;
  username: string;
  email: string;
  password?: string;
  avatar: string;
  isAdmin: boolean;
  googleId?: string;
  facebookId?: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: number;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    provider: {
      type: String,
      required: true,
      default: EMAIL_PROVIDER.Email,
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      required: function () {
        // @ts-ignore
        return this.provider === "email";
      },
      minlength: [6, "Password must be at least 6 characters long"],
    },
    avatar: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Number,
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);

export default User;
