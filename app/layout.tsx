import type { Metadata, Viewport } from "next";
import { UserProfileProvider } from "@/context/UserProfileContext";

export const metadata: Metadata = {
  title: "Mi Dieta Personalizada - Plan Nutricional Científico",
  description: "Plan de dieta personalizado basado en ciencia nutricional con seguimiento de macros, para aterosclerosis y resistencia a la insulina",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>
        <style>{`
          html { scroll-behavior: smooth; }
          *, *::before, *::after { box-sizing: border-box; }
          body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          ::selection { background: rgba(78, 235, 194, 0.3); color: #fff; }
          input:focus-visible, select:focus-visible, textarea:focus-visible {
            outline: 2px solid rgba(78, 235, 194, 0.5);
            outline-offset: 2px;
          }
          button:focus-visible {
            outline: 2px solid rgba(78, 235, 194, 0.5);
            outline-offset: 2px;
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          }
        `}</style>
        <UserProfileProvider>{children}</UserProfileProvider>
      </body>
    </html>
  );
}
