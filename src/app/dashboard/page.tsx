"use client";

import { Ticket, ShieldCheck, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { StatCard, ActiveRewardItem } from "@/components/ui";
import { RedeemCouponCard } from "./_components/RedeemCouponCard";
import { usePartnerMetrics } from "@/hooks/usePartners";
import { useCompanyRewards } from "@/hooks/useRewards";

export default function DashboardPOS() {
  const { data: metrics, isLoading: isMetricsLoading } = usePartnerMetrics();
  const { data: rewards, isLoading: isRewardsLoading } = useCompanyRewards();

  return (
    <div className="space-y-6 select-none">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Canjear Recompensa Card */}
        <div className="lg:col-span-2">
          <RedeemCouponCard />
        </div>

        {/* Right Panel: Live Stats & Recompensas Activas */}
        <div className="space-y-6 col-span-1">
          {/* Stats Cards Section */}
          <div className="grid grid-cols-2 gap-4">
            {isMetricsLoading ? (
              <>
                {/* Stats Card Skeleton 1 */}
                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs animate-pulse space-y-4">
                  <div className="w-8 h-8 bg-canvas-base rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-canvas-base rounded-md"></div>
                    <div className="h-6 w-10 bg-canvas-base rounded-md"></div>
                  </div>
                </div>
                {/* Stats Card Skeleton 2 */}
                <div className="bg-card border border-border p-5 rounded-2xl shadow-xs animate-pulse space-y-4">
                  <div className="w-8 h-8 bg-canvas-base rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-canvas-base rounded-md"></div>
                    <div className="h-6 w-12 bg-canvas-base rounded-md"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <StatCard
                  title="Canjes de Hoy"
                  value={metrics?.todayRedeemsCount ?? 0}
                  icon={Ticket}
                />
                <StatCard
                  title="Puntos Recaudados"
                  value={metrics?.totalPointsValidated?.toLocaleString() ?? "0"}
                  icon={ShieldCheck}
                />
              </>
            )}
          </div>

          {/* Active Rewards Catalog Container */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-text-primary">
                Recompensas Activas
              </h3>
              <p className="text-[10px] text-gray-400 font-medium">
                Catálogo de premios en circulación
              </p>
            </div>

            {/* List with Loading / Empty state logic */}
            <div className="space-y-4 pt-1">
              {isRewardsLoading ? (
                <>
                  {/* Rewards Skeletons */}
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="p-4 bg-canvas-base rounded-2xl border border-border animate-pulse space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-1.5">
                          <div className="h-3.5 w-24 bg-card rounded-md"></div>
                          <div className="h-3 w-12 bg-card rounded-md"></div>
                        </div>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <div className="h-2 w-16 bg-card rounded-md"></div>
                        <div className="h-1.5 w-full bg-card rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : !rewards || rewards.length === 0 ? (
                /* Empty Catalog view */
                <div className="p-6 bg-canvas-base rounded-2xl border border-border text-center flex flex-col items-center justify-center space-y-2">
                  <HelpCircle className="w-8 h-8 text-gray-400" />
                  <p className="text-xs text-gray-400 font-bold">
                    No se encontraron recompensas
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Comienza agregando premios en configuración.
                  </p>
                </div>
              ) : (
                /* Real lists mapped using reusable ActiveRewardItem component */
                rewards.map((reward) => (
                  <ActiveRewardItem key={reward.id} reward={reward} />
                ))
              )}
            </div>

            {/* Footer button */}
            <button
              onClick={() =>
                toast.info("Catálogo completo", {
                  description: "Redirigiendo a la pestaña de recompensas...",
                })
              }
              className="w-full py-3 hover:bg-canvas-base border border-border text-text-primary font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Ver Todas las Recompensas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
