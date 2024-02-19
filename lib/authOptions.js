import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { userName, password } = credentials;

        try {
          const user = {
            name: process.env.USER_NAME,
            password: process.env.PASSWORD,
          };

          if (!user) {
            return null;
          }

          if (userName == user.name && password == user.password) {
            return user;
          }

          if (userName !== user.name || password !== user.password) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin",
  },
};

export default authOptions;
