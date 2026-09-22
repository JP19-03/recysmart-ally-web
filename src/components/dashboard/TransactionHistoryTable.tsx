import React from "react";
import type { PartnerMetrics } from "@/schemas";

type RecentRedemptions = PartnerMetrics["recentRedemptions"];

export function TransactionHistoryTable({
  data,
  onPageChange,
}: {
  data: RecentRedemptions;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-4 w-full">
      {/* Header section with Action Link */}
      <div className="flex justify-between items-center pb-2 border-b border-border">
        <h3 className="text-sm font-black text-text-primary">
          Historial de canjes del período
        </h3>
        <span className="text-xs text-gray-400 font-bold">
          {data.total} registros
        </span>
      </div>

      {/* Horizontal Scroll wrapper for responsive tables */}
      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                ID Transacción
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Cliente
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Recompensa Entregada
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Puntos Restados
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Hora
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((tx) => (
              <tr
                key={tx.id}
                className="border-t border-border hover:bg-canvas-base/30 transition-colors"
              >
                {/* Transaction ID */}
                <td className="py-4 text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
                  {tx.id.slice(0, 12)}
                </td>

                {/* Client detail row (initials circle + name) */}
                <td className="py-4 text-xs font-bold text-text-primary">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center font-black text-[9px] shrink-0">
                      {tx.clientAlias.slice(-2)}
                    </div>
                    <span>{tx.clientAlias}</span>
                  </div>
                </td>

                {/* Reward Description */}
                <td className="py-4 text-xs font-bold text-text-primary">
                  {tx.rewardTitle}
                </td>

                {/* Points Subtracted (green bold) */}
                <td className="py-4 text-xs font-black text-brand-green">
                  - {tx.points} Pts
                </td>

                {/* Timestamp */}
                <td className="py-4 text-xs font-bold text-gray-400 dark:text-gray-500">
                  {new Intl.DateTimeFormat("es-PE", {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "America/Lima",
                  }).format(new Date(tx.redeemedAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.totalPages > 1 && (
        <div className="flex justify-end items-center gap-3 pt-2">
          <button
            disabled={data.page <= 1}
            onClick={() => onPageChange(data.page - 1)}
            className="text-xs font-bold disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-xs text-gray-400">
            {data.page} / {data.totalPages}
          </span>
          <button
            disabled={data.page >= data.totalPages}
            onClick={() => onPageChange(data.page + 1)}
            className="text-xs font-bold disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
