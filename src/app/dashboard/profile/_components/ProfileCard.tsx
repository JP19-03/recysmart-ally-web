import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "@/schemas";
import { ProfileForm } from "@/components/dashboard/ProfileForm";

interface ProfileCardProps {
  form: UseFormReturn<ProfileFormData>;
  isLoading: boolean;
}

export function ProfileCard({ form, isLoading }: ProfileCardProps) {
  return (
    <div className="w-full bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
      {/* Title */}
      <div>
        <h3 className="text-base font-black text-text-primary">
          Detalles de la Empresa
        </h3>
      </div>

      {/* Renders decoupled child form */}
      <ProfileForm form={form} isLoading={isLoading} />
    </div>
  );
}
