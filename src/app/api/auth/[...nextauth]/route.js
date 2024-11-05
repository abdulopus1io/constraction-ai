import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongoDB"; // Adjust the path based on your project structure
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const client = await clientPromise;
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id, email: user.email };
        }

        return null; // Return null if login fails
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug messages
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
