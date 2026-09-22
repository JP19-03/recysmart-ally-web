import { DefaultSession, DefaultUser } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PartnerInfo } from "../schemas";

export type AppRole = "ADMIN" | "RECYCLER" | "ALLY";

// 1. Extend core NextAuth types
declare module "next-auth" {
    // Extend Session for hook retrieval (useSession)
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            role: AppRole | string;
            partner?: PartnerInfo | null;
        } & DefaultSession["user"];
    }

    // Extend User structure returned by the 'authorize' method
    interface User extends DefaultUser {
        id: string;
        role: AppRole | string;
        token: string;
        partner?: PartnerInfo | null;
    }
}

// 2. Extend JWT Token types
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: AppRole | string;
        accessToken: string;
        partner?: PartnerInfo | null;
    }
}
