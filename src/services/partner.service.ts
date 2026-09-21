import { apiFetch } from "../lib/api";
import { PartnerMetricsSchema, PartnerMetrics } from "../schemas";

export const partnerService = {
  getMetrics: async (
    token: string,
    days = 30,
    page = 1,
    limit = 10,
  ): Promise<PartnerMetrics> => {
    const res = await apiFetch<PartnerMetrics>(
      `/partners/metrics?days=${days}&page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
      token,
    );
    return PartnerMetricsSchema.parse(res);
  },
};
