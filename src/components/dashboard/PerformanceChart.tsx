import React from "react";
import type { PartnerMetrics } from "@/schemas";

type DailyRedemption = PartnerMetrics["dailyRedemptions"][number];

export function PerformanceChart({ data }: { data: DailyRedemption[] }) {
  const maxValue = Math.max(1, ...data.map((item) => item.count));

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-6 w-full">
      {/* Chart Header details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-text-primary">
            Tráfico de Canjes
          </h3>
          <p className="text-[10px] text-gray-400 font-medium">
            Volumen de cupones validados por día
          </p>
        </div>

        <span className="text-[10px] font-bold text-gray-400">
          Datos reales del período seleccionado
        </span>
      </div>

      {/* Grid Canvas area */}
      <div className="h-60 w-full overflow-x-auto pt-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-gray-400">
            Todavía no hay canjes en este período.
          </div>
        ) : (
          <div className="h-full flex items-end gap-3 min-w-max px-2 pb-2">
            {data.map((item) => (
              <div
                key={item.date}
                className="h-full w-10 flex flex-col items-center justify-end gap-2"
              >
                <span className="text-[9px] font-bold text-text-primary">
                  {item.count}
                </span>
                <div
                  className="w-5 min-h-1 bg-brand-green rounded-t-md"
                  style={{
                    height: `${Math.max(4, (item.count / maxValue) * 82)}%`,
                  }}
                  title={`${item.date}: ${item.count} canjes`}
                />
                <span className="text-[9px] text-gray-400 font-bold">
                  {item.date.slice(5)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
