import prisma from '../../../lib/Prisma';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);
        let userRole = "GitHub User";
        if (profile?.email === "lelisayohanes1991@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);
        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        try {
          // Find the user by email using Prisma
          const foundUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          if (foundUser) {
            // Compare the provided password with the hashed password in the database
            const match = await bcrypt.compare(credentials.password, foundUser.password);
  
            if (match) {
              // Set additional attributes if needed, such as user role  
              // Return the user object
              return foundUser;
            }
          }
  
          // If the user is not found or the password does not match, return null
          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn', // Ensure this path is correct
  },
};

export default NextAuth(options);
