import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { rewardService } from "../services/reward.service";
import { CreateRewardFormData } from "../schemas";

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

export function useCreateReward() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;
  const companyId = session?.user?.partner?.id;

  return useMutation({
    mutationFn: (data: CreateRewardFormData) => {
      if (!token) {
        throw new Error("No estás autenticado. Inicie sesión nuevamente.");
      }
      if (!companyId) {
        throw new Error("No hay perfil comercial asociado a su cuenta.");
      }
      return rewardService.createReward({ ...data, companyId }, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active-rewards", companyId] });
    },
  });
}
