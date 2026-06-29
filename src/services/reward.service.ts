import { z } from "zod";
import { apiFetch } from "../lib/api";
import { RewardSchema, Reward, CreateRewardFormData } from "../schemas";

export const rewardService = {
  getCompanyRewards: async (companyId: string, token: string): Promise<Reward[]> => {
    const res = await apiFetch<Reward[]>(
      `/rewards/company/${companyId}`,
      {
        method: "GET",
      },
      token
    );
    return z.array(RewardSchema).parse(res);
  },
  createReward: async (data: CreateRewardFormData & { companyId: string }, token: string): Promise<Reward> => {
    const payload = {
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
    };
    const res = await apiFetch<Reward>(
      "/rewards/create",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token
    );
    return RewardSchema.parse(res);
  },
};
