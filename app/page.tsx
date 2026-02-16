"use client";

import { useState } from "react";
import DietPlanner from "@/components/DietPlanner";
import Aterosclerosis from "@/components/Aterosclerosis";
import ResistenciaInsulina from "@/components/ResistenciaInsulina";

export default function Home() {
  const [view, setView] = useState<"diet" | "aterosclerosis" | "insulina">("diet");

  return (
    <div style={{ position: "relative" }}>
      {/* Navigation Toggle */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          display: "flex",
          gap: "10px",
          background: "rgba(13, 15, 24, 0.95)",
          backdropFilter: "blur(20px)",
          padding: "8px",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <button
          onClick={() => setView("diet")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            background:
              view === "diet"
                ? "linear-gradient(135deg, #4EEBC2, #E88CED)"
                : "transparent",
            color: view === "diet" ? "#0D0F18" : "rgba(255, 255, 255, 0.6)",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          🥗 Mi Dieta
        </button>
        <button
          onClick={() => setView("aterosclerosis")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            background:
              view === "aterosclerosis"
                ? "linear-gradient(135deg, #ef4444, #f97316)"
                : "transparent",
            color:
              view === "aterosclerosis"
                ? "#fff"
                : "rgba(255, 255, 255, 0.6)",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          🫀 Aterosclerosis
        </button>
        <button
          onClick={() => setView("insulina")}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            border: "none",
            background:
              view === "insulina"
                ? "linear-gradient(135deg, #3b82f6, #10b981)"
                : "transparent",
            color:
              view === "insulina"
                ? "#fff"
                : "rgba(255, 255, 255, 0.6)",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          ⚡ Resistencia Insulina
        </button>
      </div>

      {/* Content */}
      {view === "diet" ? <DietPlanner /> : view === "aterosclerosis" ? <Aterosclerosis /> : <ResistenciaInsulina />}
    </div>
  );
}
