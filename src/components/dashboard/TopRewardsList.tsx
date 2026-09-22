import React from "react";
import Link from "next/link";
import type { PartnerMetrics } from "@/schemas";

type TopReward = PartnerMetrics["topRewards"][number];

export function TopRewardsList({ rewards }: { rewards: TopReward[] }) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-6 h-full w-full">
      {/* Header section */}
      <div>
        <h3 className="text-sm font-black text-text-primary">
          Top Recompensas
        </h3>
        <p className="text-[10px] text-gray-400 font-medium">
          Productos más canjeados
        </p>
      </div>

      {/* Reward Rows */}
      <div className="space-y-4 flex-1">
        {rewards.length === 0 ? (
          <p className="text-xs text-gray-400 py-8 text-center">
            Todavía no hay canjes en este período.
          </p>
        ) : (
          rewards.map((item) => (
            <div
              key={item.rewardId}
              className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
            >
              {/* Left theme circle */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-black text-xs bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
                  {item.title.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-text-primary truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-brand-green font-bold">
                    {item.costInPoints} Pts
                  </span>
                </div>
              </div>

              {/* Right count label */}
              <div className="shrink-0 text-right">
                <span className="text-xs font-black text-text-primary">
                  {item.redemptions}
                </span>
                <span className="text-[8px] text-gray-400 dark:text-gray-500 font-extrabold uppercase block tracking-wider">
                  Canjes
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-2">
        <Link
          href="/dashboard/rewards"
          className="w-full py-2.5 hover:bg-canvas-base border border-border text-brand-green font-bold rounded-xl text-[10px] transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          Ver catálogo completo →
        </Link>
      </div>
    </div>
  );
}
