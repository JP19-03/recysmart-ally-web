import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export type AppRole = "ADMIN" | "RECYCLER" | "ALLY";

// 1. Extend core NextAuth types
declare module "next-auth" {
    // Extend Session for hook retrieval (useSession)
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            role: AppRole | string;
        } & DefaultSession["user"];
    }

    // Extend User structure returned by the 'authorize' method
    interface User extends DefaultUser {
        id: string;
        role: AppRole | string;
        token: string;
    }
}

// 2. Extend JWT Token types
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: AppRole | string;
        accessToken: string;
    }
}
