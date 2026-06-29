import React from "react";
import { Reward } from "../../schemas";

interface RewardCatalogCardProps {
  reward: Reward;
  onEdit?: (reward: Reward) => void;
  onToggleStatus?: (reward: Reward) => void;
  onAddStock?: (reward: Reward) => void;
  className?: string;
}

export function RewardCatalogCard({
  reward,
  onEdit,
  onToggleStatus,
  onAddStock,
  className = "",
}: RewardCatalogCardProps) {
  const isPaused =
    reward.status === "PAUSED" || reward.status === "DISCONTINUED";
  const isUnlimited =
    reward.totalStock >= 9999 || reward.remainingStock >= 9999;
  const isLowStock = !isUnlimited && reward.remainingStock <= 5 && !isPaused;

  // Determine status label and badge color
  let statusLabel = "Activo";
  let badgeClass = "bg-emerald-500 text-white";
  let bannerClass = "bg-amber-50/20 dark:bg-amber-950/5";
  let progressColor = "bg-brand-green";

  if (isPaused) {
    statusLabel = "Pausado";
    badgeClass = "bg-gray-500 text-white dark:bg-zinc-700";
    bannerClass = "bg-gray-100/50 dark:bg-zinc-900/10";
    progressColor = "bg-gray-300 dark:bg-zinc-800";
  } else if (isLowStock) {
    statusLabel = "Poco Stock";
    badgeClass = "bg-action-orange text-white";
    bannerClass = "bg-orange-50/20 dark:bg-orange-950/5";
    progressColor = "bg-action-orange";
  }

  // Calculate progress percentage
  const progress = isUnlimited
    ? 100
    : reward.totalStock > 0
      ? (reward.remainingStock / reward.totalStock) * 100
      : 0;

  // Stock representation
  const stockText = isUnlimited
    ? "Ilimitado"
    : `${reward.remainingStock} / ${reward.totalStock}`;

  return (
    <div
      className={`w-full bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-xs hover:shadow-sm transition-all duration-300 relative ${className}`}
    >
      {/* 1. Header Banner - Cream / Grey depending on state */}
      <div
        className={`h-24 md:h-28 relative transition-colors duration-300 ${bannerClass}`}
      >
        {/* Status Badge */}
        <span
          className={`absolute top-4 right-4 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeClass}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* 2. Card Body Content */}
      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* Title & Description */}
        <div className="space-y-1">
          <h4
            className="text-base font-black text-text-primary tracking-tight leading-snug line-clamp-1"
            title={reward.title}
          >
            {reward.title}
          </h4>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium leading-relaxed line-clamp-2 min-h-8">
            {reward.description ||
              "Sin descripción proporcionada para este cupón."}
          </p>
        </div>

        {/* Cost & Stock Metrics */}
        <div className="grid grid-cols-2 items-end pt-2">
          {/* User Cost */}
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
              Costo al Usuario
            </span>
            <span
              className={`text-xl font-black tracking-tight ${isPaused ? "text-gray-400" : "text-brand-green"}`}
            >
              {reward.costInPoints}{" "}
              <span className="text-xs font-bold uppercase">Pts</span>
            </span>
          </div>

          {/* Stock Metrics */}
          <div className="text-right space-y-1">
            <span className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
              Stock
            </span>
            <span className="text-xs font-bold text-text-primary">
              {stockText}
            </span>
          </div>
        </div>

        {/* Stock Progress Bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 3. Card Footer Actions (Pills buttons at the bottom) */}
      <div className="border-t border-border px-6 py-4 bg-canvas-base/30 flex items-center justify-between gap-3 min-h-15">
        {isPaused ? (
          // Paused Actions
          <button
            onClick={() => onToggleStatus?.(reward)}
            className="text-text-primary hover:text-brand-green font-bold text-xs cursor-pointer border border-border px-3 py-1.5 rounded-xl bg-card hover:bg-canvas-base active:scale-95 transition-all shadow-2xs"
          >
            Reactivar Oferta
          </button>
        ) : isLowStock ? (
          // Low Stock Actions
          <>
            <button
              onClick={() => onAddStock?.(reward)}
              className="text-brand-green hover:text-brand-green/80 font-bold text-xs cursor-pointer border border-border px-3 py-1.5 rounded-xl bg-card hover:bg-canvas-base active:scale-95 transition-all shadow-2xs"
            >
              Añadir Stock
            </button>
            <button
              onClick={() => onEdit?.(reward)}
              className="text-gray-500 hover:text-text-primary font-bold text-xs cursor-pointer border border-border px-3 py-1.5 rounded-xl bg-card hover:bg-canvas-base active:scale-95 transition-all"
            >
              Editar
            </button>
          </>
        ) : (
          // Standard Active Actions
          <>
            <button
              onClick={() => onEdit?.(reward)}
              className="text-gray-500 hover:text-text-primary font-bold text-xs cursor-pointer border border-border px-3 py-1.5 rounded-xl bg-card hover:bg-canvas-base active:scale-95 transition-all"
            >
              Editar
            </button>
            <button
              onClick={() => onToggleStatus?.(reward)}
              className="text-error-red hover:text-error-red/80 font-bold text-xs cursor-pointer border border-error-red/10 px-3 py-1.5 rounded-xl bg-card hover:bg-error-red/5 active:scale-95 transition-all"
            >
              Pausar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
