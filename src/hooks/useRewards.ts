import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { rewardService } from "../services/reward.service";

export function useCompanyRewards() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const companyId = session?.user?.partner?.id;

  return useQuery({
    queryKey: ["active-rewards", companyId],
    queryFn: () => {
      if (!token) {
        throw new Error("No token provided");
      }
      if (!companyId) {
        throw new Error("No company profile associated with this account");
      }
      return rewardService.getCompanyRewards(companyId, token);
    },
    enabled: !!token && !!companyId,
  });
}
