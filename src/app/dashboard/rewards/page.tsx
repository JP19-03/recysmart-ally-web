"use client";

import { useState } from "react";
import { toast } from "sonner";
import { HelpCircle, Plus } from "lucide-react";
import { useCompanyRewards } from "@/hooks/useRewards";
import { RewardCatalogCard } from "@/components/ui";
import { Reward } from "@/schemas";
import { CreateRewardDialog } from "./_components/CreateRewardDialog";

type FilterTab = "Todos" | "Activos" | "Poco Stock" | "Pausados";

export default function RewardsCatalogPage() {
  const { data: rewards, isLoading } = useCompanyRewards();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("Todos");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Helper to categorize rewards
  const getRewardCategory = (reward: Reward): FilterTab => {
    const isPaused =
      reward.status === "PAUSED" || reward.status === "DISCONTINUED";
    const isUnlimited =
      reward.totalStock >= 9999 || reward.remainingStock >= 9999;
    const isLowStock = !isUnlimited && reward.remainingStock <= 5 && !isPaused;

    if (isPaused) return "Pausados";
    if (isLowStock) return "Poco Stock";
    return "Activos";
  };

  // Metrics counts
  const totalCount = rewards?.length ?? 0;
  const activeCount =
    rewards?.filter((r) => getRewardCategory(r) === "Activos").length ?? 0;
  const lowStockCount =
    rewards?.filter((r) => getRewardCategory(r) === "Poco Stock").length ?? 0;
  const pausedCount =
    rewards?.filter((r) => getRewardCategory(r) === "Pausados").length ?? 0;

  // Filter rewards based on active tab and search query
  const filteredRewards = rewards?.filter((reward) => {
    const category = getRewardCategory(reward);
    const matchesTab =
      activeTab === "Todos" ||
      (activeTab === "Activos" && category === "Activos") ||
      (activeTab === "Poco Stock" && category === "Poco Stock") ||
      (activeTab === "Pausados" && category === "Pausados");

    const matchesSearch =
      reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reward.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);

    return matchesTab && matchesSearch;
  });

  // Action handlers
  const handleEdit = (reward: Reward) => {
    toast.info("Editar Recompensa", {
      description: `Editando: ${reward.title}. Formulario próximamente disponible.`,
    });
  };

  const handleToggleStatus = (reward: Reward) => {
    const isPaused =
      reward.status === "PAUSED" || reward.status === "DISCONTINUED";
    const action = isPaused ? "reactivar" : "pausar";
    toast.info(`Cambiar Estado`, {
      description: `Solicitud para ${action} la recompensa: ${reward.title}.`,
    });
  };

  const handleAddStock = (reward: Reward) => {
    toast.info("Añadir Stock", {
      description: `Incrementando stock para: ${reward.title}.`,
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 select-none">
      {/* 1. Header with mobile-first layout (stacks on mobile, side-by-side on desktop) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* Title / Description */}
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
            Catálogo de Recompensas
          </h1>
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium">
            Administra tus ofertas, ajusta los precios en puntos y controla el
            stock.
          </p>
        </div>

        {/* Action Row: Search + Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Field */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Buscar recompensa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 px-4 border border-border rounded-xl bg-card text-sm text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
            />
          </div>

          {/* Create Button */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="h-11 px-6 bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white font-bold text-sm rounded-xl cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4.5 h-4.5" />
            Crear Recompensa
          </button>
        </div>
      </div>

      {/* 2. Filter tabs (horizontal scroll on mobile, flex row on desktop) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none shrink-0 -mx-6 px-6 lg:mx-0 lg:px-0">
        {/* Todos Tab */}
        <button
          onClick={() => setActiveTab("Todos")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
            activeTab === "Todos"
              ? "bg-text-primary text-card border-text-primary"
              : "bg-card text-gray-400 dark:text-gray-500 border-border hover:text-text-primary"
          }`}
        >
          Todos ({totalCount})
        </button>

        {/* Activos Tab */}
        <button
          onClick={() => setActiveTab("Activos")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
            activeTab === "Activos"
              ? "bg-text-primary text-card border-text-primary"
              : "bg-card text-gray-400 dark:text-gray-500 border-border hover:text-text-primary"
          }`}
        >
          Activos ({activeCount})
        </button>

        {/* Poco Stock Tab */}
        <button
          onClick={() => setActiveTab("Poco Stock")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
            activeTab === "Poco Stock"
              ? "bg-text-primary text-card border-text-primary"
              : "bg-card text-gray-400 dark:text-gray-500 border-border hover:text-text-primary"
          }`}
        >
          Poco Stock ({lowStockCount})
        </button>

        {/* Pausados Tab */}
        <button
          onClick={() => setActiveTab("Pausados")}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
            activeTab === "Pausados"
              ? "bg-text-primary text-card border-text-primary"
              : "bg-card text-gray-400 dark:text-gray-500 border-border hover:text-text-primary"
          }`}
        >
          Pausados ({pausedCount})
        </button>
      </div>

      {/* 3. Grid of Catalog Cards (mobile-first grid spans) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          /* Loading skeletons mapped */
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="w-full bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-xs animate-pulse"
            >
              <div className="h-24 md:h-28 bg-canvas-base"></div>
              <div className="p-6 flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-2/3 bg-canvas-base rounded-md"></div>
                  <div className="h-3 w-5/6 bg-canvas-base rounded-md"></div>
                </div>
                <div className="grid grid-cols-2 items-end pt-2">
                  <div className="space-y-2">
                    <div className="h-2 w-12 bg-canvas-base rounded-md"></div>
                    <div className="h-5 w-16 bg-canvas-base rounded-md"></div>
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="h-2 w-8 bg-canvas-base rounded-md"></div>
                    <div className="h-4 w-10 bg-canvas-base rounded-md"></div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-canvas-base rounded-full"></div>
              </div>
              <div className="border-t border-border px-6 py-4 bg-canvas-base/30 flex items-center justify-between min-h-15">
                <div className="h-6 w-14 bg-canvas-base rounded-lg"></div>
                <div className="h-6 w-14 bg-canvas-base rounded-lg"></div>
              </div>
            </div>
          ))
        ) : !filteredRewards || filteredRewards.length === 0 ? (
          /* Empty Catalog view */
          <div className="col-span-full bg-card border border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-75">
            <HelpCircle className="w-10 h-10 text-gray-400" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-text-primary">
                No se encontraron recompensas
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                No hay recompensas en el catálogo que coincidan con la búsqueda
                o el filtro actual.
              </p>
            </div>
          </div>
        ) : (
          /* Render actual dynamic catalog list cards */
          filteredRewards.map((reward) => (
            <RewardCatalogCard
              key={reward.id}
              reward={reward}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onAddStock={handleAddStock}
            />
          ))
        )}
      </div>

      {/* Create Reward modal overlay drawer */}
      <CreateRewardDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
