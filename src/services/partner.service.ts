import { apiFetch } from "../lib/api";
import { PartnerMetricsSchema, PartnerMetrics } from "../schemas";

export const partnerService = {
  getMetrics: async (token: string): Promise<PartnerMetrics> => {
    const res = await apiFetch<PartnerMetrics>(
      "/partners/metrics",
      {
        method: "GET",
      },
      token
    );
    return PartnerMetricsSchema.parse(res);
  },
};
