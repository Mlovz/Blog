import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { IDecodedToken } from "../config/interface";

const CLIENT_URL = `${process.env.BASE_URL}`;

const userCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await Users.findOne({ account });
      if (user)
        return res
          .status(400)
          .json({ msg: "Email or phone nubmer already exist!" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        name,
        account,
        password: passwordHash,
      });

      // const access_token = generateAccessToken({ newUser });
      // const url = `${CLIENT_URL}/active/${active_token}`;

      // sendEmail(account, url, "Verify your email");
      await newUser.save();

      res.json({
        msg: "Success! Please check your email!",
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await Users.findOne({ account });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Email or phone nubmer already exist!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid password!" });

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
      });

      return res.json({
        msg: "Logged",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({
        msg: "Logged out!",
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.refreshtoken;

      if (!token) return res.status(400).json({ msg: "Please login now!" });

      const decoded = <IDecodedToken>(
        jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );

      if (!decoded.id)
        return res.status(400).json({ msg: "Please login now!" });

      const user = await Users.findById({ _id: decoded.id }).select(
        "-password"
      );
      if (!user)
        return res.status(400).json({ msg: "This account does not exist!" });

      const access_token = generateAccessToken({ id: user._id });

      res.json({
        access_token,
        user,
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
