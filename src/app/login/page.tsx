"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Coffee, ShoppingCart, Film, Store, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { DraftLogInSchema, LogInFormData } from "@/schemas";

export default function Login() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: zodResolver(DraftLogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LogInFormData) => {
    setFormError(null);
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setFormError(res.error || "Credenciales inválidas. Inténtalo de nuevo.");
        toast.error("Error al iniciar sesión", {
          description: res.error || "Credenciales incorrectas.",
        });
      } else {
        toast.success("¡Autenticación exitosa!", {
          description: "Accediendo a tu panel de aliado...",
        });
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setFormError("Ocurrió un error inesperado al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-background text-foreground antialiased selection:bg-brand-green/20">
      
      {/* Left Pane - Tinted Background Image Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-emerald-950">
        
        {/* Background Image with Tint Overlay */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: "url('/login_banner.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/90 to-emerald-950"></div>

        {/* Branding Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg">
            <Store className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white flex flex-col leading-none">
            RecySmart
            <span className="text-xs font-normal text-emerald-400 tracking-widest uppercase">Partners</span>
          </span>
        </div>

        {/* Marketing Info */}
        <div className="relative z-10 max-w-xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            Aumenta tu tráfico peatonal
          </div>

          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Atrae clientes. <br />
            Salva el planeta.
          </h1>

          <p className="text-emerald-200/90 text-lg leading-relaxed font-medium">
            Únete a la red de negocios sostenibles más grande de la ciudad. Ofrece recompensas, valida cupones y convierte el reciclaje en ventas reales para tu local.
          </p>

          <hr className="border-emerald-800/60" />

          {/* Allied Categories */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Empresas Aliadas:</span>
            <div className="flex gap-4 text-emerald-300">
              <div className="w-10 h-10 bg-emerald-900/40 rounded-xl flex items-center justify-center border border-emerald-800/30" title="Cafeterías y Restaurantes">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-emerald-900/40 rounded-xl flex items-center justify-center border border-emerald-800/30" title="Supermercados y Tiendas">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-emerald-900/40 rounded-xl flex items-center justify-center border border-emerald-800/30" title="Cines y Entretenimiento">
                <Film className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-emerald-500/80 text-sm font-medium">
          &copy; 2026 RecySmart Network. Aliados por un futuro sostenible.
        </div>
      </div>

      {/* Right Pane - Centered Form Card */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 bg-canvas-base dark:bg-zinc-950">
        
        <div className="w-full max-w-md bg-card border border-border p-8 sm:p-10 rounded-2xl shadow-xl transition-all duration-300">
          
          {/* Top Icon branding for mobile */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center">
              <Store className="text-white w-5.5 h-5.5" />
            </div>
            <span className="text-xl font-black tracking-tight text-text-primary">
              RecySmart <span className="text-xs text-brand-green font-bold uppercase tracking-widest">Partners</span>
            </span>
          </div>

          {/* Form Header */}
          <div className="text-center space-y-3 mb-8">
            {/* Round Green Icon Container */}
            <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto">
              <Store className="text-brand-green w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Acceso a mi Negocio
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
              Ingresa para gestionar tu catálogo de recompensas y validar cupones.
            </p>
          </div>

          {/* Error Message Box */}
          {formError && (
            <div className="mb-6 p-4 bg-error-red/10 text-error-red text-sm font-medium rounded-xl border border-error-red/20 text-center animate-in fade-in zoom-in duration-300">
              {formError}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Input: Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="font-bold text-sm text-text-primary">
                Correo Electrónico Corporativo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="gerencia@minegocio.com"
                  disabled={isLoading}
                  {...register("email")}
                  className={`w-full pl-11 pr-4 h-12 bg-canvas-base border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
                    errors.email ? "border-error-red focus:ring-error-red/20" : "border-border"
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-xs font-bold text-error-red block animate-in fade-in slide-in-from-top-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Input: Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="font-bold text-sm text-text-primary">
                  Contraseña
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-bold text-brand-green hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Enlace de restablecimiento", {
                      description: "Por favor, contacta con soporte para restablecer tu contraseña.",
                    });
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••••"
                  disabled={isLoading}
                  {...register("password")}
                  className={`w-full pl-11 pr-4 h-12 bg-canvas-base border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all ${
                    errors.password ? "border-error-red focus:ring-error-red/20" : "border-border"
                  }`}
                />
              </div>
              {errors.password && (
                <span className="text-xs font-bold text-error-red block animate-in fade-in slide-in-from-top-1">
                  {errors.password.message}
                </span>
              )}
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-brand-green hover:bg-brand-green/90 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Accediendo...
                </>
              ) : (
                "Acceder a mi Panel"
              )}
            </button>
          </form>

          {/* Form Footer */}
          <div className="mt-8 text-center space-y-4">

            
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium">
              <Lock className="w-3 h-3" />
              <span>Conexión cifrada de extremo a extremo</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
