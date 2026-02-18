"use client";

import { useState, useEffect } from "react";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastLogDate: string;
  totalDays: number;
}

function getDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default function StreakCounter() {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastLogDate: "",
    totalDays: 0,
  });
  const [todayLogged, setTodayLogged] = useState(false);
  const [animateFire, setAnimateFire] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dietStreak");
    if (stored) {
      try {
        const data: StreakData = JSON.parse(stored);
        const today = getDateKey();
        const yesterday = getYesterdayKey();

        // Check if streak is still valid
        if (data.lastLogDate === today) {
          setStreak(data);
          setTodayLogged(true);
        } else if (data.lastLogDate === yesterday) {
          setStreak(data);
          setTodayLogged(false);
        } else if (data.lastLogDate && data.lastLogDate < yesterday) {
          // Streak broken
          setStreak({ ...data, currentStreak: 0 });
          setTodayLogged(false);
        }
      } catch {}
    }
  }, []);

  const logToday = () => {
    if (todayLogged) return;
    const today = getDateKey();
    const yesterday = getYesterdayKey();

    const newStreak: StreakData = {
      currentStreak: streak.lastLogDate === yesterday || streak.lastLogDate === today
        ? streak.currentStreak + 1
        : 1,
      longestStreak: 0,
      lastLogDate: today,
      totalDays: streak.totalDays + 1,
    };
    newStreak.longestStreak = Math.max(streak.longestStreak, newStreak.currentStreak);

    setStreak(newStreak);
    setTodayLogged(true);
    setAnimateFire(true);
    localStorage.setItem("dietStreak", JSON.stringify(newStreak));
    setTimeout(() => setAnimateFire(false), 2000);
  };

  const fireIntensity = Math.min(streak.currentStreak, 10);

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
        @keyframes fireFlicker {
          0%, 100% { transform: scaleY(1) translateY(0); }
          25% { transform: scaleY(1.1) translateY(-2px); }
          50% { transform: scaleY(0.95) translateY(1px); }
          75% { transform: scaleY(1.05) translateY(-1px); }
        }
        @keyframes fireGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 185, 113, 0.2); }
          50% { box-shadow: 0 0 40px rgba(245, 185, 113, 0.4), 0 0 60px rgba(239, 68, 68, 0.2); }
        }
        @keyframes sparkle {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-30px) scale(0); opacity: 0; }
        }
        @keyframes streakPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .streak-log-btn:hover:not(:disabled) {
          background: rgba(245, 185, 113, 0.15) !important;
          border-color: rgba(245, 185, 113, 0.3) !important;
          transform: translateY(-1px);
        }
      `}</style>

      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 16 }}>
        Racha de dieta
      </div>

      {/* Fire & Streak Number */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        marginBottom: 16,
        animation: animateFire ? "streakPulse 0.5s ease" : "none",
      }}>
        <div style={{
          fontSize: 44,
          animation: streak.currentStreak > 0 ? `fireFlicker ${1.5 - fireIntensity * 0.05}s ease-in-out infinite` : "none",
          filter: streak.currentStreak > 5 ? "drop-shadow(0 0 8px rgba(245, 185, 113, 0.5))" : "none",
        }}>
          {streak.currentStreak === 0 ? "💤" : streak.currentStreak >= 7 ? "🔥" : "🔥"}
        </div>
        <div>
          <div style={{
            fontSize: 36, fontWeight: 900,
            fontFamily: "'JetBrains Mono', monospace",
            background: streak.currentStreak > 0
              ? "linear-gradient(135deg, #F5B971, #ef4444)"
              : "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}>
            {streak.currentStreak}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
            {streak.currentStreak === 1 ? "dia" : "dias"} seguidos
          </div>
        </div>
      </div>

      {/* Sparkle particles */}
      {animateFire && (
        <div style={{ position: "absolute", top: "30%", left: "50%", pointerEvents: "none" }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 4, height: 4,
                borderRadius: "50%",
                background: i % 2 === 0 ? "#F5B971" : "#ef4444",
                left: `${(i - 3) * 12}px`,
                animation: `sparkle 0.8s ease ${i * 0.1}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 16, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>Mejor racha</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#F5B971", fontFamily: "'JetBrains Mono', monospace" }}>{streak.longestStreak}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>Total dias</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#E88CED", fontFamily: "'JetBrains Mono', monospace" }}>{streak.totalDays}</div>
        </div>
      </div>

      {/* Log button */}
      <button
        className="streak-log-btn"
        onClick={logToday}
        disabled={todayLogged}
        style={{
          width: "100%",
          padding: "10px 16px",
          borderRadius: 12,
          border: `1px solid ${todayLogged ? "rgba(78,235,194,0.2)" : "rgba(245, 185, 113, 0.15)"}`,
          background: todayLogged ? "rgba(78,235,194,0.08)" : "rgba(245, 185, 113, 0.08)",
          color: todayLogged ? "#4EEBC2" : "#F5B971",
          fontSize: 13, fontWeight: 700,
          cursor: todayLogged ? "default" : "pointer",
          fontFamily: "'Outfit', sans-serif",
          transition: "all 0.3s ease",
          letterSpacing: 0.3,
        }}
      >
        {todayLogged ? "Dia registrado!" : "Registrar dia de dieta"}
      </button>
    </div>
  );
}
