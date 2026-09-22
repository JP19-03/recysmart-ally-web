"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import { NavItem } from "./NavItem";
import {
  Leaf,
  Ticket,
  Gift,
  TrendingUp,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";

interface SidebarProps {
  isOpenMobile?: boolean;
  setIsOpenMobile?: (isOpen: boolean) => void;
}

export function Sidebar({
  isOpenMobile = false,
  setIsOpenMobile,
}: SidebarProps) {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  // Nav categories from the design guidelines
  const posRoutes = [
    { name: "Validar Cupón", href: "/dashboard", icon: Ticket },
    { name: "Mis Recompensas", href: "/dashboard/rewards", icon: Gift },
    { name: "Rendimiento", href: "/dashboard/performance", icon: TrendingUp },
  ];

  const configRoutes = [
    { name: "Perfil del Negocio", href: "/dashboard/profile", icon: Settings },
  ];

  // Helper to extract company name and initials
  const companyName = session?.user?.partner?.companyName || "EcoCafe Central";
  const branchName = "Sucursal Miraflores"; // Fallback branch name

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(companyName);

  return (
    <>
      {/* Mobile Drawer Overlay Background */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile && setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`bg-card text-foreground flex flex-col shrink-0 z-50 h-screen border-r border-border
          /* Desktop flow */
          lg:relative transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          
          /* Mobile flow */
          fixed inset-y-0 left-0 w-64
          transform transition-transform duration-300 ease-in-out lg:transform-none lg:translate-x-0
          ${isOpenMobile ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header Logo Section */}
        <div className={`h-16 flex items-center border-b border-border shrink-0 ${
          collapsed ? "lg:justify-center px-4" : "justify-between px-6"
        }`}>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center shadow-xs">
              <Leaf className="text-white w-4.5 h-4.5" />
            </div>
            {!collapsed && (
              <span className="text-lg font-black tracking-tight text-text-primary ml-2.5 animate-in fade-in duration-200">
                RecySmart <span className="text-brand-green font-bold text-xs uppercase tracking-wider block leading-none">Partners</span>
              </span>
            )}
          </div>
          
          {/* Desktop Collapse Trigger */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:block p-1 rounded-lg hover:bg-canvas-base text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
              title="Colapsar menú"
              aria-label="Colapsar menú"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          
          {/* Mobile Drawer Close Trigger */}
          <button
            onClick={() => setIsOpenMobile && setIsOpenMobile(false)}
            className="block lg:hidden p-1 rounded-lg hover:bg-canvas-base text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Cerrar menú móvil"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Collapsed Expand Trigger (Centered Arrow) */}
        {collapsed && (
          <div className="hidden lg:flex justify-center py-2 border-b border-border bg-canvas-base/50">
            <button
              onClick={() => setCollapsed(false)}
              className="p-1 rounded-full hover:bg-brand-green hover:text-white text-gray-400 transition-all duration-200 cursor-pointer"
              title="Expandir menú"
              aria-label="Expandir menú"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation List */}
        <div className={`flex-1 overflow-y-auto py-6 space-y-6 ${collapsed ? "px-2" : "px-4"}`}>
          {/* PUNTO DE VENTA SECTION */}
          <div>
            {!collapsed ? (
              <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 animate-in fade-in duration-200">
                Punto de Venta
              </p>
            ) : (
              <div className="border-b border-border my-2" />
            )}
            <nav className="space-y-1">
              {posRoutes.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  collapsed={isOpenMobile ? false : collapsed}
                  onClick={() => setIsOpenMobile && setIsOpenMobile(false)}
                />
              ))}
            </nav>
          </div>

          {/* CONFIGURACIÓN SECTION */}
          <div>
            {!collapsed ? (
              <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 animate-in fade-in duration-200">
                Configuración
              </p>
            ) : (
              <div className="border-b border-border my-2" />
            )}
            <nav className="space-y-1">
              {configRoutes.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  collapsed={isOpenMobile ? false : collapsed}
                  onClick={() => setIsOpenMobile && setIsOpenMobile(false)}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* Profile Footer Section */}
        <div className={`p-4 border-t border-border bg-canvas-base/50 shrink-0 ${
          collapsed ? "lg:flex lg:justify-center lg:items-center" : "flex items-center justify-between"
        }`}>
          <div className="flex items-center overflow-hidden" title={collapsed ? companyName : undefined}>
            {/* Initials circle avatar */}
            <div className="w-10 h-10 rounded-full bg-brand-green text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs border border-brand-green/20">
              {initials}
            </div>

            {!collapsed && (
              <div className="ml-3 overflow-hidden animate-in fade-in duration-200">
                <p className="text-sm font-extrabold text-text-primary truncate">
                  {companyName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {branchName}
                </p>
              </div>
            )}
          </div>

          {/* Logout button (hidden when collapsed) */}
          {!collapsed && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-1.5 rounded-lg text-gray-400 hover:text-error-red hover:bg-error-red/10 transition-colors cursor-pointer"
              title="Cerrar Sesión"
              aria-label="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
