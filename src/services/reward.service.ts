import { z } from "zod";
import { apiFetch } from "../lib/api";
import { RewardSchema, Reward } from "../schemas";

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
};
