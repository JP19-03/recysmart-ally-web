"use client";

import { useState } from "react";
import { Award, Download, Percent, TrendingUp, Users } from "lucide-react";
import { PerformanceStatCard } from "@/components/dashboard/PerformanceStatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { TopRewardsList } from "@/components/dashboard/TopRewardsList";
import { TransactionHistoryTable } from "@/components/dashboard/TransactionHistoryTable";
import { usePartnerMetrics } from "@/hooks/usePartners";

type MetricsPeriod = 7 | 30 | 90;

export default function PerformancePage() {
  const [days, setDays] = useState<MetricsPeriod>(30);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePartnerMetrics(days, page, 10);

  const changePeriod = (value: MetricsPeriod) => {
    setDays(value);
    setPage(1);
  };

  return (
    <div className="space-y-6 md:space-y-8 select-none">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
            Rendimiento y Estadísticas
          </h1>
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium">
            Métricas reales de las recompensas de tu empresa.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto sm:justify-end">
          <select
            aria-label="Período de métricas"
            value={days}
            onChange={(event) =>
              changePeriod(Number(event.target.value) as MetricsPeriod)
            }
            className="h-11 px-4 bg-card border border-border text-text-primary font-bold text-xs rounded-xl"
          >
            <option value={7}>Últimos 7 días</option>
            <option value={30}>Últimos 30 días</option>
            <option value={90}>Últimos 90 días</option>
          </select>
          <button
            onClick={() => window.print()}
            className="h-11 px-5 bg-text-primary text-card font-bold text-xs rounded-xl flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Imprimir reporte</span>
          </button>
        </div>
      </div>

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          No fue posible cargar las métricas. Intenta nuevamente.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <PerformanceStatCard
          title="Cupones Canjeados"
          value={
            isLoading
              ? "…"
              : (data?.summary.redeemedCoupons ?? 0).toLocaleString()
          }
          icon={Award}
          badgeType="none"
          iconTheme="green"
        />
        <PerformanceStatCard
          title="Puntos Validados"
          value={
            isLoading
              ? "…"
              : (data?.summary.validatedPoints ?? 0).toLocaleString()
          }
          icon={TrendingUp}
          badgeType="none"
          iconTheme="blue"
        />
        <PerformanceStatCard
          title="Clientes Únicos"
          value={
            isLoading
              ? "…"
              : (data?.summary.uniqueCustomers ?? 0).toLocaleString()
          }
          icon={Users}
          badgeType="none"
          iconTheme="purple"
        />
        <PerformanceStatCard
          title="Conversión de Cupones"
          value={isLoading ? "…" : `${data?.summary.conversionRate ?? 0}%`}
          icon={Percent}
          badgeType="none"
          iconTheme="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex">
          <PerformanceChart data={data?.dailyRedemptions ?? []} />
        </div>
        <div className="lg:col-span-1 flex">
          <TopRewardsList rewards={data?.topRewards ?? []} />
        </div>
      </div>

      <TransactionHistoryTable
        data={
          data?.recentRedemptions ?? {
            page,
            limit: 10,
            total: 0,
            totalPages: 0,
            items: [],
          }
        }
        onPageChange={setPage}
      />
    </div>
  );
}
