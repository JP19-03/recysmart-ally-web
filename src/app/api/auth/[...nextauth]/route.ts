import { DraftLogInSchema } from "@/schemas";
import { authService } from "@/services/auth.service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = DraftLogInSchema.safeParse(credentials);

          if (!parsedCredentials.success) {
            console.error("Zod Validation Error:", parsedCredentials.error.format());
            throw new Error("Datos inválidos. Revisa el correo y la contraseña.");
          }

          const { email, password } = parsedCredentials.data;
          const res = await authService.login({ email, password });

          if (res && res.token) {
            if (res.user.role !== "ALLY") {
              throw new Error("Acceso denegado. Se requiere cuenta de Comercio Aliado.");
            }
            return {
              id: res.user.id,
              name: res.user.name,
              role: res.user.role,
              token: res.token,
              partner: res.user.partner,
            };
          }

          return null;
        } catch (error: unknown) {
          console.error("Error in authorize:", error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Error al iniciar sesión");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
        token.partner = user.partner;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
        session.user.partner = token.partner;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
