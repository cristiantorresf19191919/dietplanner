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

  const navItems = [
    { key: "diet" as const, label: "Mi Dieta", icon: "🥗", activeGradient: "linear-gradient(135deg, #4EEBC2, #E88CED)" },
    { key: "aterosclerosis" as const, label: "Aterosclerosis", icon: "🫀", activeGradient: "linear-gradient(135deg, #ef4444, #f97316)" },
    { key: "insulina" as const, label: "Insulina", icon: "⚡", activeGradient: "linear-gradient(135deg, #3b82f6, #10b981)" },
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Sticky Header */}
      <header
        className="main-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(13, 15, 24, 0.97)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: 60,
            gap: 12,
          }}
        >
          {/* Profile Quick Access */}
          {hasProfile ? (
            <button
              onClick={() => setShowProfileForm(true)}
              className="profile-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 12,
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "'Outfit', sans-serif",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 18 }}>👤</span>
              {nutritionalNeeds && (
                <div className="profile-macros" style={{ display: "flex", gap: 8, fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                  <span style={{ color: "#4EEBC2" }}>{nutritionalNeeds.targetCalories} cal</span>
                  <span className="profile-macro-detail" style={{ color: "#F5B971" }}>{nutritionalNeeds.protein}g P</span>
                </div>
              )}
            </button>
          ) : (
            <div style={{ width: 40 }} />
          )}

          {/* Desktop Navigation Pills */}
          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              gap: 6,
              background: "rgba(255, 255, 255, 0.03)",
              padding: 4,
              borderRadius: 14,
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 10,
                  border: "none",
                  background: view === item.key ? item.activeGradient : "transparent",
                  color: view === item.key ? (item.key === "diet" ? "#0D0F18" : "#fff") : "rgba(255, 255, 255, 0.5)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontFamily: "'Outfit', sans-serif",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ marginRight: 6 }}>{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Spacer to balance layout */}
          <div className="header-spacer" style={{ width: 40, flexShrink: 0 }} />
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(13, 15, 24, 0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          display: "none", // shown via media query
          padding: "8px 16px",
          paddingBottom: "max(8px, env(safe-area-inset-bottom))",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around", maxWidth: 400, margin: "0 auto" }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 16px",
                border: "none",
                borderRadius: 12,
                background: view === item.key ? `${item.activeGradient}` : "transparent",
                color: view === item.key ? (item.key === "diet" ? "#0D0F18" : "#fff") : "rgba(255, 255, 255, 0.4)",
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.25s ease",
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.02em" }}>{item.label}</span>
            </button>
          ))}
          {hasProfile && (
            <button
              onClick={() => setShowProfileForm(true)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 16px",
                border: "none",
                borderRadius: 12,
                background: "transparent",
                color: "rgba(255, 255, 255, 0.4)",
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.25s ease",
              }}
            >
              <span style={{ fontSize: 20 }}>👤</span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.02em" }}>Perfil</span>
            </button>
          )}
        </div>
      </nav>

      {/* Content */}
      <main style={{ paddingBottom: 80 }}>
        {view === "diet" ? <DietPlanner /> : view === "aterosclerosis" ? <Aterosclerosis /> : <ResistenciaInsulina />}
      </main>

      {/* Profile Form */}
      {(!hasProfile || showProfileForm) && (
        <UserProfileForm onComplete={() => setShowProfileForm(false)} />
      )}

      <style jsx global>{`
        /* Desktop: show header nav, hide bottom nav */
        .mobile-bottom-nav { display: none !important; }
        .desktop-nav { display: flex !important; }

        .profile-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(78, 235, 194, 0.2) !important;
        }

        @media (max-width: 768px) {
          /* Mobile: hide desktop nav labels, show bottom nav */
          .mobile-bottom-nav {
            display: flex !important;
          }

          .desktop-nav {
            display: none !important;
          }

          .main-header {
            height: auto !important;
          }

          .main-header > div {
            height: 52px !important;
            padding: 0 16px !important;
          }

          .profile-macro-detail {
            display: none !important;
          }

          .header-spacer {
            display: none !important;
          }

          main {
            padding-bottom: 100px !important;
          }
        }

        @media (max-width: 480px) {
          .profile-macros {
            display: none !important;
          }

          .main-header > div {
            justify-content: center !important;
          }
        }

        @media (min-width: 769px) {
          main {
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
