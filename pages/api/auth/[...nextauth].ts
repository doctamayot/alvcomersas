import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {

    //     user.role="Cliente"
    //     return true
    //   },
    
    async session({ session, token, user }:any) {        
        // session.user.role ="Cliente"
      return session;
    },
  },
  secret: process.env.SECRET, // SECRET env variable
  adapter: MongoDBAdapter(clientPromise),
});
