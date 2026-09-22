import { UseFormReturn } from "react-hook-form";
import { RedeemCouponFormData } from "@/schemas";
import { Scan, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface RedeemCouponFormProps {
  form: UseFormReturn<RedeemCouponFormData>;
  isLoading: boolean;
}

export function RedeemCouponForm({ form, isLoading }: RedeemCouponFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="w-full max-w-md space-y-6">
      
      {/* Input container */}
      <div className="space-y-2">
        <div className={`w-full bg-canvas-base border rounded-2xl p-2 focus-within:ring-2 focus-within:ring-brand-green/30 focus-within:border-brand-green transition-all shadow-inner ${
          errors.code ? "border-error-red" : "border-border"
        }`}>
          <input
            id="code"
            type="text"
            placeholder="EJ: RECY-A1B2C3D4E5F6..."
            disabled={isLoading}
            {...register("code")}
            className="w-full text-center py-4 bg-transparent outline-none font-mono text-2xl font-black tracking-widest text-text-primary placeholder-gray-300 dark:placeholder-gray-700 uppercase disabled:opacity-50"
          />
        </div>
        
        {errors.code && (
          <p className="text-xs text-error-red font-semibold text-center animate-in fade-in duration-200">
            {errors.code.message}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-1/2 h-12 bg-brand-green hover:bg-brand-green/90 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <ShieldCheck className="w-4.5 h-4.5" />
          {isLoading ? "Validando..." : "Validar Código"}
        </button>
        
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            toast.info("Iniciar cámara", {
              description: "Accediendo a la cámara del dispositivo para escanear QR...",
            });
          }}
          className="w-full sm:w-1/2 h-12 bg-card hover:bg-canvas-base border border-border text-text-primary font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Scan className="w-4.5 h-4.5 text-gray-500" />
          Usar Cámara
        </button>
      </div>

    </div>
  );
}
