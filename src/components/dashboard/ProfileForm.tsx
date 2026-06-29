import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "@/schemas";
import { toast } from "sonner";

interface ProfileFormProps {
  form: UseFormReturn<ProfileFormData>;
  isLoading: boolean;
}

export function ProfileForm({ form, isLoading }: ProfileFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-8 w-full">
      {/* 1. Logo area (responsive columns: row on desktop, centered column on mobile) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-border">
        {/* Green square logo placeholder */}
        <div className="w-24 h-24 bg-emerald-50/50 dark:bg-emerald-950/10 border-2 border-dashed border-emerald-300 dark:border-emerald-700/50 rounded-2xl flex flex-col items-center justify-center shrink-0">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            Logo
          </span>
        </div>

        {/* Logo Text Descriptions & Trigger button */}
        <div className="text-center sm:text-left space-y-3">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-text-primary">
              Logotipo Corporativo
            </h4>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed">
              Este logo aparecerá en el catálogo de recompensas de los
              ciudadanos. Formato PNG o JPG.
            </p>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              toast.info("Cambiar imagen", {
                description: "Carga de archivos multimedia próximamente...",
              })
            }
            className="h-9 px-4 hover:bg-canvas-base border border-border text-text-primary font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            Cambiar imagen
          </button>
        </div>
      </div>

      {/* 2. Form Fields Grid (1 column on mobile, 2 columns on tablet/desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="companyName"
            className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
          >
            Nombre de la Empresa
          </label>
          <input
            id="companyName"
            type="text"
            disabled={isLoading}
            placeholder="EcoCafe Central"
            {...register("companyName")}
            className={`w-full h-11 px-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
              errors.companyName ? "border-error-red" : "border-border"
            }`}
          />
          {errors.companyName && (
            <p className="text-[10px] text-error-red font-semibold">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* RUC Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="ruc"
            className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
          >
            Número de RUC
          </label>
          <input
            id="ruc"
            type="text"
            disabled={isLoading}
            placeholder="20123456789"
            {...register("ruc")}
            className={`w-full h-11 px-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
              errors.ruc ? "border-error-red" : "border-border"
            }`}
          />
          {errors.ruc && (
            <p className="text-[10px] text-error-red font-semibold">
              {errors.ruc.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            disabled={isLoading}
            placeholder="gerencia@ecocafe.com"
            {...register("email")}
            className={`w-full h-11 px-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
              errors.email ? "border-error-red" : "border-border"
            }`}
          />
          {errors.email && (
            <p className="text-[10px] text-error-red font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Read-Only Role Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="role"
            className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
          >
            Rol de Sistema
          </label>
          <input
            id="role"
            type="text"
            disabled
            value="ALLY (ALIADO COMERCIAL)"
            className="w-full h-11 px-4 border border-border rounded-xl bg-canvas-base text-sm text-gray-400 font-medium cursor-not-allowed select-none"
          />
          <p className="text-[9px] text-gray-400 font-medium">
            El rol de la cuenta no puede ser modificado por el usuario.
          </p>
        </div>
      </div>
    </div>
  );
}
