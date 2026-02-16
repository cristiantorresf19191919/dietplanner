"use client";

import { useState } from "react";
import { useUserProfile } from "@/context/UserProfileContext";
import DietPlanner from "@/components/DietPlanner";
import Aterosclerosis from "@/components/Aterosclerosis";
import ResistenciaInsulina from "@/components/ResistenciaInsulina";
import UserProfileForm from "@/components/UserProfileForm";

export default function Home() {
  const [view, setView] = useState<"diet" | "aterosclerosis" | "insulina">("diet");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { hasProfile, nutritionalNeeds } = useUserProfile();

  return (
    <div style={{ position: "relative" }}>
      {/* Navigation Toggle */}
      <div
        className="nav-toggle"
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

      {/* Profile Button */}
      {hasProfile && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 1000,
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => setShowProfileForm(true)}
            style={{
              padding: "10px 16px",
              background: "linear-gradient(135deg, #4EEBC2, #E88CED)",
              border: "none",
              borderRadius: "12px",
              color: "#0D0F18",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 700,
              transition: "all 0.3s ease",
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 4px 16px rgba(78, 235, 194, 0.3)",
            }}
          >
            👤 Mi Perfil
          </button>
          {nutritionalNeeds && (
            <div
              style={{
                padding: "12px",
                background: "rgba(13, 15, 24, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div>🔥 {nutritionalNeeds.targetCalories} cal</div>
              <div>💪 {nutritionalNeeds.protein}g P</div>
              <div>🍞 {nutritionalNeeds.carbs}g C</div>
              <div>🥑 {nutritionalNeeds.fats}g G</div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {view === "diet" ? <DietPlanner /> : view === "aterosclerosis" ? <Aterosclerosis /> : <ResistenciaInsulina />}

      {/* Profile Form */}
      {(!hasProfile || showProfileForm) && (
        <UserProfileForm onComplete={() => setShowProfileForm(false)} />
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-toggle {
            top: 10px !important;
            right: 10px !important;
            left: 10px !important;
            gap: 6px !important;
            padding: 6px !important;
            border-radius: 12px !important;
            flex-wrap: wrap;
            justify-content: center;
          }

          .nav-toggle button {
            padding: 8px 12px !important;
            font-size: 12px !important;
            flex: 1;
            min-width: 90px;
            white-space: nowrap;
          }
        }

        @media (max-width: 480px) {
          .nav-toggle {
            gap: 4px !important;
            padding: 4px !important;
          }

          .nav-toggle button {
            padding: 6px 8px !important;
            font-size: 11px !important;
            min-width: 80px;
          }
        }
      `}</style>
    </div>
  );
}
