import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  jwt: {
    maxAge: 60 * 60, // 1 hour (in seconds)
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour (in seconds)
    updateAge: 15 * 60, // refresh JWT every 15 minutes if user is active
  },

  session: {
    strategy: "jwt", // Use "jwt" strategy to avoid DB-stored sessions
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) {
          throw new Error(
            encodeURIComponent("User ID and password are required")
          );
        }

        const user = await prisma.user.findUnique({
          where: { userId: credentials.userId },
        });

        if (!user) {
          throw new Error(encodeURIComponent("No user found with this user id"));
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error(encodeURIComponent("Incorrect password"));
        }

        return {
          id: user.id,
          name: user.name,
          userId: user.userId,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login", // custom login page
    error: "/login", // redirect auth errors to login page
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };