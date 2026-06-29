"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Leaf, ShieldCheck, Ticket, AlertTriangle, RefreshCw, Sun, Moon } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Por favor, ingrese un código de cupón.");
      return;
    }

    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      const codeUpper = couponCode.toUpperCase().trim();
      if (codeUpper === "RECY2026" || codeUpper === "ALLYGREEN") {
        toast.success("¡Cupón validado correctamente!", {
          description: "Descuento del 15% aplicado para el usuario.",
        });
      } else {
        toast.error("Validación fallida", {
          description: "El cupón no existe o ya ha expirado.",
        });
      }
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 md:p-12 transition-colors duration-300 selection:bg-brand-green/20">
      {/* Container */}
      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* Navigation / Header */}
        <header className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center shadow-xs">
              <Leaf className="text-white w-5.5 h-5.5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              RecySmart <span className="text-brand-green font-medium">Ally</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center cursor-pointer transition-all hover:bg-canvas-base active:scale-95"
                title="Cambiar Tema"
              >
                {theme === "dark" ? (
                  <Sun className="w-4.5 h-4.5 text-brand-green" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-text-primary" />
                )}
              </button>
            )}
            <span className="text-xs font-semibold px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-full">
              Portal de Aliados
            </span>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Typographic Scale & Description */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Display Title <br />
              <span className="text-brand-green">Ecosystem Control.</span>
            </h1>
            <h2 className="text-xl font-bold tracking-tight text-text-primary">
              Section Header
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Body text used for descriptions. The background is lighter here than the admin panel, to feel more like a modern SaaS product for merchants.
            </p>

            {/* Quick Stats Panel */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-card border border-border p-4 rounded-2xl shadow-xs">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block">Cupones Validados</span>
                <span className="text-2xl font-extrabold text-text-primary block mt-1">1,482</span>
              </div>
              <div className="bg-card border border-border p-4 rounded-2xl shadow-xs">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block">Estatus de Alertas</span>
                <span className="text-xs font-bold px-2 py-0.5 mt-2 bg-action-orange/10 text-action-orange rounded-full inline-flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Stock Bajo
                </span>
              </div>
            </div>
          </div>

          {/* Interactive UI Element: Validation Form */}
          <div className="bg-card border border-border p-8 rounded-2xl shadow-md space-y-6 transition-all duration-300">
            <div>
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">
                UI Elements
              </span>
              <h3 className="text-lg font-bold text-text-primary">
                Validar Recompensas
              </h3>
            </div>

            <form onSubmit={handleValidate} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="coupon" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Código del Cupón
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Ej. RECY2026 o ALLYGREEN"
                    className="w-full pl-11 pr-4 h-12 bg-canvas-base border border-border rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                  />
                </div>
              </div>

              {/* Primary Button */}
              <button
                type="submit"
                disabled={isValidating}
                className="w-full h-12 bg-brand-green hover:bg-brand-green/90 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {isValidating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Validando Código...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Validate Coupon
                  </>
                )}
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={() => setCouponCode("")}
                className="w-full h-12 bg-transparent hover:bg-canvas-base border border-border text-text-primary font-bold rounded-xl text-sm transition-all flex items-center justify-center cursor-pointer"
              >
                Cancel
              </button>
            </form>

            <div className="bg-canvas-base p-4 rounded-xl border border-border text-xs text-gray-500 leading-relaxed">
              <strong>Tip de prueba:</strong> Ingresa <code className="bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded font-mono font-bold">RECY2026</code> o <code className="bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded font-mono font-bold">ALLYGREEN</code> para simular una validación exitosa. Cualquier otro código disparará una alerta de error.
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-500 pt-8 border-t border-border/60">
          &copy; 2026 RecySmart Network. Todos los derechos reservados.
        </footer>

      </div>
    </main>
  );
}
