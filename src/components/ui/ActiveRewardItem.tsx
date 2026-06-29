import React from "react";
import { Reward } from "../../schemas";

interface ActiveRewardItemProps {
  reward: Reward;
  className?: string;
}

export function ActiveRewardItem({
  reward,
  className = "",
}: ActiveRewardItemProps) {
  // Determine if stock is "unlimited" (represented by remainingStock >= 9999)
  const isUnlimited =
    reward.totalStock >= 9999 || reward.remainingStock >= 9999;

  // Calculate progress bar percentage
  const progress = isUnlimited
    ? 100
    : reward.totalStock > 0
      ? (reward.remainingStock / reward.totalStock) * 100
      : 0;

  // Stock status text
  const stockText = isUnlimited
    ? "Ilimitado"
    : `${reward.remainingStock} / ${reward.totalStock}`;

  // Style configurations based on stock levels
  const isLowStock = !isUnlimited && reward.remainingStock <= 5;
  const barColor = isUnlimited
    ? "bg-blue-500"
    : isLowStock
      ? "bg-action-orange"
      : "bg-brand-green";

  return (
    <div
      className={`p-4 bg-canvas-base rounded-2xl border border-border space-y-3 relative transition-all hover:shadow-xs ${className}`}
    >
      {/* Title & Cost info */}
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h4
            className="text-sm font-bold text-text-primary truncate"
            title={reward.title}
          >
            {reward.title}
          </h4>
          <span className="text-xs text-brand-green font-semibold">
            {reward.costInPoints} Pts
          </span>
        </div>

        {/* Low Stock Warning Badge */}
        {isLowStock && (
          <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 bg-action-orange/10 text-action-orange rounded-full border border-action-orange/20 animate-pulse">
            Poco Stock
          </span>
        )}
      </div>

      {/* Stock Bar Indicators */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 font-bold">
          <span>STOCK DISPONIBLE</span>
          <span className="text-text-primary">{stockText}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
