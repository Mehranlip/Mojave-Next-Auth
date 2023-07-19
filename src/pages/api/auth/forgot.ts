import { resetPasswordEmail } from "@/emailTemplates/reset";
import UserModal from "../../../../models/User";
import connectDb from "../../../../utils/connectDb";
import sendMail from "../../../../utils/sendMail";
import { createResetToken } from "../../../../utils/tokens";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { email } = req.body;
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist." });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.NEXTAUTH_URL}/reset/${user_id}`;
    await sendMail(
      email,
      user.name,
      user.image,
      url,
      "Reset your password - Mehranlip",
      resetPasswordEmail
    );
    res.json({
      message: "An email has been sent to you, use it to reset your password.",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
