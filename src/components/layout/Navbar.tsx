"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, Leaf } from "lucide-react";

interface NavbarProps {
  onOpenMenu: () => void;
}

export function Navbar({ onOpenMenu }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid theme hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Determine headers based on path
  const getHeaderInfo = (path: string) => {
    switch (path) {
      case "/dashboard/rewards":
        return {
          title: "Mis Recompensas",
          subtitle: "Gestiona el catálogo de premios disponibles para tus clientes.",
        };
      case "/dashboard/performance":
        return {
          title: "Rendimiento",
          subtitle: "Revisa las estadísticas de cupones validados y puntos recaudados.",
        };
      case "/dashboard/profile":
        return {
          title: "Perfil del Negocio",
          subtitle: "Configura los datos principales de tu marca y establecimiento.",
        };
      case "/dashboard":
      default:
        return {
          title: "Terminal POS",
          subtitle: "Escanea o ingresa el código del cliente para entregar su recompensa.",
        };
    }
  };

  const { title, subtitle } = getHeaderInfo(pathname);

  return (
    <header className="h-16 lg:h-20 bg-card border-b border-border flex items-center px-6 shrink-0 justify-between z-30 select-none">
      
      {/* Left: Hamburger menu (mobile only) & Dynamic Titles (desktop) */}
      <div className="flex items-center gap-3">
        {/* Hamburger Trigger */}
        <button
          onClick={onOpenMenu}
          className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-canvas-base hover:text-text-primary transition-colors cursor-pointer lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand/Mobile Title (mobile only) */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="w-7 h-7 bg-brand-green rounded-lg flex items-center justify-center shadow-xs">
            <Leaf className="text-white w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm tracking-tight">
            RecySmart <span className="text-brand-green font-bold text-[10px] uppercase">Partners</span>
          </span>
        </div>

        {/* Page Titles (desktop only) */}
        <div className="hidden lg:flex flex-col">
          <h1 className="text-xl font-extrabold text-text-primary tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Connected Status, Darkmode Toggle */}
      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 text-xs font-semibold">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
          Sistema Conectado
        </div>

        {/* Theme Switcher Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center cursor-pointer transition-all hover:bg-canvas-base active:scale-95 text-gray-500 dark:text-gray-400"
            title="Cambiar Tema"
          >
            {theme === "dark" ? (
              <Sun className="w-4.5 h-4.5 text-brand-green animate-in zoom-in-50 duration-200" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-text-primary animate-in zoom-in-50 duration-200" />
            )}
          </button>
        )}
      </div>

    </header>
  );
}
