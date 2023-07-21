import UserModal from "../../../../models/User";
import connectDb from "../../../../utils/connectDb";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
const { RESET_TOKEN_SECRET } = process.env;
import bcrypt from "bcryptjs";
interface UserToken {
  id: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { token, password } = req.body;
    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as UserToken;
    const userDb = await UserModal.findById(userToken.id);
    if (!userDb) {
      return res.status(400).json({ message: "This account no longer exist." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await UserModal.findByIdAndUpdate(userDb.id, { password: cryptedPassword });
    res.json({
      message: "Your account password has beeen successfully updated.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
