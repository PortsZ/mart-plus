import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "admin",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "admin",
        },
      },
      async authorize(credentials) {
        //GET DATABASE DATA
        const user = {
          id: "1",
          name: "admin",
          password: "admin",
          email: "user@martplus.com",
          image: "https://avatars.githubusercontent.com/u/139426?v=4",
        };
        //CHECK IF CREDENTIALS MATCH

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else return null;
      },
    }),
  ],
};

export default options;
