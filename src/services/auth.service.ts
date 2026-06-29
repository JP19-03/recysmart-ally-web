import { ErrorResponseSchema, LogInFormData, LogInResponseSchema, UserAPIResponseSchema, User } from "../schemas";
import { ApiError } from "../utils";
import { apiFetch } from "../lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
    login: async (data: LogInFormData) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok) {
            const error = ErrorResponseSchema.parse(json);
            throw new ApiError(error.message);
        }

        return LogInResponseSchema.parse(json);
    },
    getProfile: async (token: string): Promise<User> => {
        const res = await apiFetch<User>("/auth/profile", {
            method: 'GET'
        }, token);
        return UserAPIResponseSchema.parse(res);
    }
}
