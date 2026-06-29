"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import { ProfileFormSchema, ProfileFormData } from "@/schemas";
import { ProfileCard } from "./_components/ProfileCard";

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      companyName: "",
      ruc: "",
      email: "",
    },
  });

  // Populate form values once the query resolves
  useEffect(() => {
    if (profile) {
      form.reset({
        companyName: profile.partner?.companyName ?? "",
        ruc: profile.partner?.ruc ?? "",
        email: profile.email ?? "",
      });
    }
  }, [profile, form]);

  const onSubmit = (data: ProfileFormData) => {
    setIsSaving(true);
    // Simulate API update call since no backend profile update exists yet
    setTimeout(() => {
      setIsSaving(false);
      toast.success("¡Perfil Actualizado!", {
        description: "Los cambios se han guardado exitosamente en el sistema.",
      });
      // Reset form to keep current values as clean baseline state
      form.reset(data);
    }, 1000);
  };

  const handleDiscard = () => {
    if (profile) {
      form.reset({
        companyName: profile.partner?.companyName ?? "",
        ruc: profile.partner?.ruc ?? "",
        email: profile.email ?? "",
      });
      toast.info("Cambios descartados", {
        description:
          "Los campos del perfil se han restaurado a sus valores iniciales.",
      });
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 select-none">
      {/* 1. Page Header (stacks vertically on mobile, aligns side-by-side on desktop) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* Title & Description */}
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
            Configuración del Perfil
          </h1>
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium">
            Administra los datos registrados de tu empresa en la red RecySmart.
          </p>
        </div>

        {/* Header Actions (Descartar and Guardar buttons) */}
        <div className="flex items-center gap-3 w-full sm:w-auto sm:justify-end">
          <button
            type="button"
            disabled={isLoading || isSaving}
            onClick={handleDiscard}
            className="w-1/2 sm:w-auto h-11 px-6 bg-card hover:bg-canvas-base border border-border text-text-primary font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            Descartar
          </button>

          <button
            type="button"
            disabled={isLoading || isSaving}
            onClick={form.handleSubmit(onSubmit)}
            className="w-1/2 sm:w-auto h-11 px-6 bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white font-bold text-sm rounded-xl cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      {/* 2. Main Card Container with Loading / Skeleton State */}
      {isLoading ? (
        /* Profile Card Skeleton Loader */
        <div className="w-full bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xs space-y-8 animate-pulse">
          <div className="h-4 w-40 bg-canvas-base rounded-md"></div>

          {/* Logo Skeleton */}
          <div className="flex gap-5 pb-6 border-b border-border">
            <div className="w-24 h-24 bg-canvas-base rounded-2xl"></div>
            <div className="space-y-2 flex-1 pt-2">
              <div className="h-4 w-32 bg-canvas-base rounded-md"></div>
              <div className="h-3 w-3/4 bg-canvas-base rounded-md"></div>
              <div className="h-8 w-24 bg-canvas-base rounded-md pt-2"></div>
            </div>
          </div>

          {/* Form Fields Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="space-y-2">
                <div className="h-3 w-28 bg-canvas-base rounded-md"></div>
                <div className="h-11 w-full bg-canvas-base rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Render actual dynamic ProfileCard with bindings */
        <ProfileCard form={form} isLoading={isSaving} />
      )}
    </div>
  );
}
