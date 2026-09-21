import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { partnerService } from "../services/partner.service";

export function usePartnerMetrics(days = 30, page = 1, limit = 10) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery({
    queryKey: ["dashboard-metrics", days, page, limit],
    queryFn: () => {
      if (!token) {
        throw new Error("No token provided");
      }
      return partnerService.getMetrics(token, days, page, limit);
    },
    enabled: !!token,
  });
}
