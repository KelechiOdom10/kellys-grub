import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { IUser } from "~/models/userModel";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user: IUser) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.json({
        success: false,
        message: "Not authorized to access this route",
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    res.json({
      success: false,
      message: "Not authorized as admin",
    });
  }
};
