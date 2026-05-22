import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google OAuth — will work once real keys are added to .env.local
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials provider for email/password demo login
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock user validation — replace with real DB lookup in production
        if (
          credentials?.email === "demo@bemsbooks.com" &&
          credentials?.password === "demo123"
        ) {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@bemsbooks.com",
            image: null,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to sign-in
      }
      return true;
    },
  },
});
