"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { toast } from "sonner";
import { CreateRewardSchema, CreateRewardFormData } from "@/schemas";
import { useCreateReward } from "@/hooks/useRewards";
import { CreateRewardForm } from "@/components/dashboard/CreateRewardForm";
import { ApiError } from "@/utils";

interface CreateRewardDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateRewardDialog({ open, onClose }: CreateRewardDialogProps) {
  const form = useForm<CreateRewardFormData>({
    resolver: zodResolver(CreateRewardSchema),
    defaultValues: {
      title: "",
      description: "",
      costInPoints: 150,
      totalStock: 50,
      expiresAt: "",
    },
  });

  const createReward = useCreateReward();

  if (!open) return null;

  const onSubmit = (data: CreateRewardFormData) => {
    createReward.mutate(data, {
      onSuccess: (res) => {
        toast.success("¡Recompensa Creada!", {
          description: `El premio "${res.title}" se registró correctamente en el catálogo.`,
        });
        form.reset();
        onClose();
      },
      onError: (error) => {
        if (error instanceof ApiError) {
          error.messages.forEach((msg) => toast.error(msg));
        } else {
          toast.error(error.message || "Error al crear la recompensa");
        }
      },
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      {/* Modal Dialog Card Container (rounded, shadow, max-w-lg) */}
      <div className="bg-card border border-border w-full max-w-lg rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-green"></div>

        {/* Header Block with X close button */}
        <div className="flex justify-between items-center pb-2">
          <div>
            <h3 className="text-lg font-black text-text-primary">
              Nueva Recompensa
            </h3>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
              Completa los detalles del cupón a publicar.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-gray-400 hover:bg-canvas-base hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Renders dynamic child input elements */}
          <CreateRewardForm form={form} isLoading={createReward.isPending} />

          {/* Action Footer row (mobile stacks, desktop side-by-side) */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-3 pt-2 border-t border-border">
            <button
              type="button"
              disabled={createReward.isPending}
              onClick={handleClose}
              className="h-11 px-6 bg-card hover:bg-canvas-base border border-border text-text-primary font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50 text-center"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={createReward.isPending}
              className="h-11 px-6 bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white font-bold text-sm rounded-xl cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-center"
            >
              {createReward.isPending ? "Guardando..." : "Guardar Recompensa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
