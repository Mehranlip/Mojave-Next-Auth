import connectDb from "../../../../utils/connectDb";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
const { ACTIVATION_TOKEN_SECRET } = process.env;
interface UserToken {
  id: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { token } = req.body;
    const userToken = jwt.verify(token, ACTIVATION_TOKEN_SECRET!);
    console.log(userToken.id);

    res.json({
      message: "Register succes ! Please activate Your account to start.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
