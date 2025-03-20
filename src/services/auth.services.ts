import UserModel from "../model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import checkEnvVariable from "../utils/checkEnv";

const seckretKey = checkEnvVariable("JWT_SECRET");
export class AuthService {
  static async signup(email: string, password: string) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, seckretKey, {
      expiresIn: "1d",
    });

    return { token, user: { id: user._id, email: user.email } };
  }

  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, seckretKey, {
      expiresIn: "1d",
    });

    return { token, user: { id: user._id, email: user.email } };
  }
}
