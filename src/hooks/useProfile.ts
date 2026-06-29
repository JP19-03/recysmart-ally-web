import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { authService } from "../services/auth.service";

export function useProfile() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => {
      if (!token) {
        throw new Error("No token provided");
      }
      return authService.getProfile(token);
    },
    enabled: !!token,
  });
}
