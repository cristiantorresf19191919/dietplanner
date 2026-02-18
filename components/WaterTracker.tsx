"use client";

import { useState, useEffect } from "react";

const DAILY_GOAL = 8;

function getDateKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function WaterTracker() {
  const [glasses, setGlasses] = useState(0);
  const [animatingGlass, setAnimatingGlass] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("waterTracker");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.date === getDateKey()) {
          setGlasses(data.glasses);
        }
      } catch {}
    }
  }, []);

  const addGlass = () => {
    if (glasses >= DAILY_GOAL) return;
    const next = glasses + 1;
    setGlasses(next);
    setAnimatingGlass(next - 1);
    localStorage.setItem("waterTracker", JSON.stringify({ date: getDateKey(), glasses: next }));

    if (next === DAILY_GOAL) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    setTimeout(() => setAnimatingGlass(null), 600);
  };

  const removeGlass = () => {
    if (glasses <= 0) return;
    const next = glasses - 1;
    setGlasses(next);
    localStorage.setItem("waterTracker", JSON.stringify({ date: getDateKey(), glasses: next }));
  };

  const pct = Math.round((glasses / DAILY_GOAL) * 100);

  return (
    <div style={{
      padding: "20px 24px",
      borderRadius: 20,
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.06)",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes waterFill {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes waterWave {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-3px); }
        }
        @keyframes dropFall {
          0% { transform: translateY(-20px) scale(1); opacity: 1; }
          100% { transform: translateY(40px) scale(0.5); opacity: 0; }
        }
        @keyframes celebrateWater {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .water-glass:hover { transform: scale(1.15) !important; }
        .water-glass:active { transform: scale(0.95) !important; }
        .water-btn:hover { background: rgba(56, 189, 248, 0.15) !important; border-color: rgba(56, 189, 248, 0.3) !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 4 }}>
            Hidratacion diaria
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#38bdf8", fontFamily: "'JetBrains Mono', monospace" }}>{glasses}</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>/ {DAILY_GOAL} vasos</span>
          </div>
        </div>

        <div style={{
          padding: "6px 14px", borderRadius: 12,
          background: pct === 100 ? "rgba(78,235,194,0.15)" : "rgba(56, 189, 248, 0.1)",
          border: `1px solid ${pct === 100 ? "rgba(78,235,194,0.3)" : "rgba(56, 189, 248, 0.2)"}`,
          fontSize: 13, fontWeight: 700,
          color: pct === 100 ? "#4EEBC2" : "#38bdf8",
          animation: showCelebration ? "celebrateWater 0.5s ease infinite" : "none",
        }}>
          {pct === 100 ? "Meta cumplida!" : `${pct}%`}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 16, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 3,
          width: `${pct}%`,
          background: "linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc)",
          boxShadow: "0 0 12px rgba(56, 189, 248, 0.4)",
          transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>

      {/* Glasses Grid */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
        {Array.from({ length: DAILY_GOAL }).map((_, i) => {
          const filled = i < glasses;
          const isAnimating = i === animatingGlass;
          return (
            <div
              key={i}
              className="water-glass"
              onClick={filled ? removeGlass : addGlass}
              style={{
                width: 36, height: 48,
                borderRadius: "4px 4px 10px 10px",
                border: `2px solid ${filled ? "rgba(56, 189, 248, 0.5)" : "rgba(255,255,255,0.1)"}`,
                background: "rgba(255,255,255,0.02)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: isAnimating ? "scale(1.2)" : "scale(1)",
              }}
            >
              {/* Water fill */}
              {filled && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "100%",
                  background: "linear-gradient(180deg, rgba(56, 189, 248, 0.3), rgba(14, 165, 233, 0.6))",
                  transformOrigin: "bottom",
                  animation: isAnimating ? "waterFill 0.5s ease forwards" : "none",
                  borderRadius: "0 0 8px 8px",
                }}>
                  {/* Wave effect */}
                  <div style={{
                    position: "absolute", top: -2, left: "50%",
                    width: "200%", height: 6,
                    background: "radial-gradient(ellipse, rgba(125, 211, 252, 0.6) 0%, transparent 70%)",
                    animation: "waterWave 2s ease-in-out infinite",
                    borderRadius: "50%",
                  }} />
                </div>
              )}

              {/* Drop animation */}
              {isAnimating && (
                <div style={{
                  position: "absolute", top: 0, left: "50%", marginLeft: -4,
                  width: 8, height: 10,
                  background: "#38bdf8",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  animation: "dropFall 0.5s ease forwards",
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Action button */}
      <button
        className="water-btn"
        onClick={addGlass}
        disabled={glasses >= DAILY_GOAL}
        style={{
          width: "100%",
          padding: "10px 16px",
          borderRadius: 12,
          border: "1px solid rgba(56, 189, 248, 0.15)",
          background: glasses >= DAILY_GOAL ? "rgba(78,235,194,0.08)" : "rgba(56, 189, 248, 0.08)",
          color: glasses >= DAILY_GOAL ? "#4EEBC2" : "#38bdf8",
          fontSize: 13, fontWeight: 700,
          cursor: glasses >= DAILY_GOAL ? "default" : "pointer",
          fontFamily: "'Outfit', sans-serif",
          transition: "all 0.3s ease",
          letterSpacing: 0.3,
        }}
      >
        {glasses >= DAILY_GOAL ? "Excelente hidratacion hoy!" : "+ Agregar vaso de agua"}
      </button>
    </div>
  );
}
