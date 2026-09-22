import { ErrorResponseSchema, LogInFormData, LogInResponseSchema, UserAPIResponseSchema, User } from "../schemas";
import { ApiError } from "../utils";
import { apiFetch } from "../lib/api";

const BASE_URL = typeof window === 'undefined'
    ? (process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api` : 'http://localhost:3001/api')
    : process.env.NEXT_PUBLIC_API_URL;

export const authService = {
    login: async (data: LogInFormData) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        let json;
        try {
            json = await res.json();
        } catch {
            throw new ApiError(["Error de conexión con el servidor (Respuesta no válida)"]);
        }

        if (!res.ok) {
            const error = ErrorResponseSchema.safeParse(json);
            if (error.success) {
                throw new ApiError(error.data.message);
            } else {
                throw new ApiError([json.message || "Error desconocido al iniciar sesión"]);
            }
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
