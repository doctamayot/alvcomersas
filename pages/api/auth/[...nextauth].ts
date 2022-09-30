import NextAuth, { Account, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { dbUsers } from "../../../database";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/",
  },

  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },

  session: {
    maxAge: 2592000, /// 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user?.role) {
        user.role = "Cliente";
      }
      return true;
    },

    async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAUthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;
        }
      }

      return token;
    },

    async session({ session, user, token }) {
      //console.log({ session, token, user });
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },

  //debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),

  secret: process.env.SECRET,
});
