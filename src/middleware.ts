import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si la sesión existe, la petición continuará
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Solo permite el acceso a las rutas protegidas si existe un token
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Redirige aquí si no está autorizado
    },
  }
);

// Define qué rutas deben pasar por el middleware
export const config = {
  matcher: [
    "/dashboard/:path*", // Todo dentro del dashboard
    "/",                 // Raíz (que redirige al dashboard)
  ],
};
