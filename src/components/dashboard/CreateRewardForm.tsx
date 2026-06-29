import { UseFormReturn } from "react-hook-form";
import { CreateRewardFormData } from "@/schemas";

interface CreateRewardFormProps {
  form: UseFormReturn<CreateRewardFormData>;
  isLoading: boolean;
}

export function CreateRewardForm({ form, isLoading }: CreateRewardFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4 w-full text-left">
      {/* Title */}
      <div className="space-y-1.5">
        <label
          htmlFor="title"
          className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
        >
          Título de la Recompensa *
        </label>
        <input
          id="title"
          type="text"
          disabled={isLoading}
          placeholder="Ej: 10% de descuento en Frutas Orgánicas"
          {...register("title")}
          className={`w-full h-11 px-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
            errors.title ? "border-error-red" : "border-border"
          }`}
        />
        {errors.title && (
          <p className="text-[10px] text-error-red font-semibold">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label
          htmlFor="description"
          className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
        >
          Descripción *
        </label>
        <textarea
          id="description"
          disabled={isLoading}
          rows={3}
          placeholder="Canjea este cupón para obtener un 10% de descuento en tu compra de frutas orgánicas..."
          {...register("description")}
          className={`w-full p-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all resize-none ${
            errors.description ? "border-error-red" : "border-border"
          }`}
        />
        {errors.description && (
          <p className="text-[10px] text-error-red font-semibold">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Cost in Points & Total Stock Row (1 column on mobile, 2 columns on desktop/tablet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cost in Points */}
        <div className="space-y-1.5">
          <label
            htmlFor="costInPoints"
            className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
          >
            Costo en Puntos *
          </label>
          <input
            id="costInPoints"
            type="number"
            disabled={isLoading}
            placeholder="150"
            {...register("costInPoints", { valueAsNumber: true })}
            className={`w-full h-11 px-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
              errors.costInPoints ? "border-error-red" : "border-border"
            }`}
          />
          {errors.costInPoints && (
            <p className="text-[10px] text-error-red font-semibold">
              {errors.costInPoints.message}
            </p>
          )}
        </div>

        {/* Total Stock */}
        <div className="space-y-1.5">
          <label
            htmlFor="totalStock"
            className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
          >
            Stock Inicial *
          </label>
          <input
            id="totalStock"
            type="number"
            disabled={isLoading}
            placeholder="50"
            {...register("totalStock", { valueAsNumber: true })}
            className={`w-full h-11 px-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
              errors.totalStock ? "border-error-red" : "border-border"
            }`}
          />
          {errors.totalStock && (
            <p className="text-[10px] text-error-red font-semibold">
              {errors.totalStock.message}
            </p>
          )}
        </div>
      </div>

      {/* Expiration Date */}
      <div className="space-y-1.5">
        <label
          htmlFor="expiresAt"
          className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider block"
        >
          Fecha de Expiración (Opcional)
        </label>
        <input
          id="expiresAt"
          type="date"
          disabled={isLoading}
          {...register("expiresAt")}
          className={`w-full h-11 px-4 border rounded-xl bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
            errors.expiresAt ? "border-error-red" : "border-border"
          }`}
        />
        {errors.expiresAt && (
          <p className="text-[10px] text-error-red font-semibold">
            {errors.expiresAt.message}
          </p>
        )}
      </div>
    </div>
  );
}
