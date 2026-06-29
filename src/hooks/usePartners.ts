import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { partnerService } from "../services/partner.service";

export function usePartnerMetrics() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: () => {
      if (!token) {
        throw new Error("No token provided");
      }
      return partnerService.getMetrics(token);
    },
    enabled: !!token,
  });
}
