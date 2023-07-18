import NextAuth, { Account, Profile, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Adapter } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import connectDb from "../../../../utils/connectDb";
import UserModal from "../../../../models/User";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Name",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDb();
        const user = await UserModal.findOne({ email: credentials!.email });
        if (!user) {
          throw new Error("Email is not registered.");
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect.");
        }
        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: User | Adapter | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.provider = account?.provider;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.provider = token.provider;
      }
      return session;
    },
  },
});
function CredentialsProvider(arg0: {
  name: string;
  credentials: {
    email: { label: string; type: string };
    password: { label: string; type: string };
  };
  authorize(credentials: any): Promise<any>;
}): import("next-auth/providers").Provider {
  throw new Error("Function not implemented.");
}
