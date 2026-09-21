import { z } from "zod";
import { apiFetch } from "../lib/api";
import { RewardSchema, Reward, CreateRewardFormData } from "../schemas";

export const rewardService = {
  getMyRewards: async (
    token: string,
    page = 1,
    limit = 20,
  ): Promise<Reward[]> => {
    const res = await apiFetch<Reward[]>(
      `/rewards/mine?page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
      token,
    );
    return z.array(RewardSchema).parse(res);
  },
  createReward: async (
    data: CreateRewardFormData,
    token: string,
  ): Promise<Reward> => {
    const payload = {
      ...data,
      expiresAt: data.expiresAt
        ? new Date(data.expiresAt).toISOString()
        : undefined,
    };
    const res = await apiFetch<Reward>(
      "/rewards/create",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token,
    );
    return RewardSchema.parse(res);
  },
  updateReward: async (
    rewardId: string,
    data: Omit<CreateRewardFormData, "totalStock">,
    token: string,
  ): Promise<Reward> => {
    const res = await apiFetch<Reward>(
      `/rewards/${rewardId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          ...data,
          expiresAt: data.expiresAt
            ? new Date(data.expiresAt).toISOString()
            : null,
        }),
      },
      token,
    );
    return RewardSchema.parse(res);
  },
  setStatus: async (
    rewardId: string,
    status: "ACTIVE" | "DISCONTINUED",
    token: string,
  ): Promise<Reward> => {
    const res = await apiFetch<Reward>(
      `/rewards/${rewardId}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) },
      token,
    );
    return RewardSchema.parse(res);
  },
  addStock: async (
    rewardId: string,
    amount: number,
    token: string,
  ): Promise<Reward> => {
    const res = await apiFetch<Reward>(
      `/rewards/${rewardId}/stock`,
      { method: "POST", body: JSON.stringify({ amount }) },
      token,
    );
    return RewardSchema.parse(res);
  },
};
