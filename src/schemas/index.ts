import { z } from "zod";

export const SuccessResponseSchema = z.object({
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  statusCode: z.number(),
});

export const DraftLogInSchema = z.object({
  email: z.string().min(1, "El correo electrónico es requerido").email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const RewardSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  title: z.string(),
  description: z.string(),
  costInPoints: z.number(),
  totalStock: z.number(),
  remainingStock: z.number(),
  status: z.string(),
  expiresAt: z.string(),
});

export const PartnerInfoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  companyName: z.string(),
  ruc: z.string(),
  logoUrl: z.string().nullable().optional(),
  rewards: z.array(RewardSchema),
});

export const UserAPIResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  partner: PartnerInfoSchema.nullable().optional(),
});

export const LogInResponseSchema = z.object({
  user: UserAPIResponseSchema,
  token: z.string(),
});

export type LogInFormData = z.infer<typeof DraftLogInSchema>;
export type User = z.infer<typeof UserAPIResponseSchema>;
export type LogInResponse = z.infer<typeof LogInResponseSchema>;
export type Reward = z.infer<typeof RewardSchema>;
export type PartnerInfo = z.infer<typeof PartnerInfoSchema>;

export const RedeemCouponSchema = z.object({
  code: z.string()
    .min(1, "El código del cupón es requerido")
    .trim()
    .toUpperCase(),
});

export const RedeemCouponResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  couponCode: z.string(),
  rewardTitle: z.string(),
  clientName: z.string(),
  redeemedAt: z.string(),
});

export type RedeemCouponFormData = z.infer<typeof RedeemCouponSchema>;
export type RedeemCouponResponse = z.infer<typeof RedeemCouponResponseSchema>;

export const PartnerMetricsSchema = z.object({
  todayRedeemsCount: z.number(),
  totalPointsValidated: z.number(),
});

export type PartnerMetrics = z.infer<typeof PartnerMetricsSchema>;

export const ProfileFormSchema = z.object({
  companyName: z.string().min(1, "El nombre de la empresa es requerido"),
  ruc: z.string()
    .min(11, "El RUC debe tener exactamente 11 dígitos")
    .max(11, "El RUC debe tener exactamente 11 dígitos")
    .regex(/^\d+$/, "El RUC debe contener sólo números"),
  email: z.string().min(1, "El correo electrónico es requerido").email("Email inválido"),
  role: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;

export const CreateRewardSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  costInPoints: z.number({ message: "Debe ingresar un número" })
    .int("Debe ser un número entero")
    .min(0, "El costo no puede ser negativo"),
  totalStock: z.number({ message: "Debe ingresar un número" })
    .int("Debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
  expiresAt: z.string().optional().or(z.literal("")),
});

export type CreateRewardFormData = z.infer<typeof CreateRewardSchema>;

