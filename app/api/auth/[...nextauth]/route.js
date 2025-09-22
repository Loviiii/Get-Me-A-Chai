import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/db/connectDb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        // connect to database
        await connectDB();

        // check if user already exists
        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          // create a new user
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
      }
      return true;
    },

    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
        return session;
      }
      
    },
  },
});

export { handler as GET, handler as POST };
