import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Email & Password
    // CredentialsProvider({
    //   id: "credentials",
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "text",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     await dbConnect();

    //     // Find user with the email
    //     const user = await User.findOne({
    //       email: credentials?.email,
    //     });

    //     // Email Not found
    //     if (!user) {
    //       throw new Error("Email is not registered");
    //     }

    //     // Check hased password with DB hashed password
    //     const isPasswordCorrect = await compare(
    //       credentials!.password,
    //       user.hashedPassword
    //     );

    //     // Incorrect password
    //     if (!isPasswordCorrect) {
    //       throw new Error("Password is incorrect");
    //     }

    //     return user;
    //   },
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  secret: process.env.SECRET,
});
