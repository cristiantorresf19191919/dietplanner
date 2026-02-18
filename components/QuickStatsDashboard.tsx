"use client";

import { useUserProfile } from "@/context/UserProfileContext";
import BMIGauge from "./BMIGauge";
import WaterTracker from "./WaterTracker";
import StreakCounter from "./StreakCounter";
import HealthTips from "./HealthTips";

function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours();
  if (hour < 6) return { text: "Buenas noches", emoji: "🌙" };
  if (hour < 12) return { text: "Buenos dias", emoji: "☀️" };
  if (hour < 18) return { text: "Buenas tardes", emoji: "🌤️" };
  return { text: "Buenas noches", emoji: "🌙" };
}

function getGoalLabel(goal: string): string {
  switch (goal) {
    case "lose_weight": return "Perder peso";
    case "maintain": return "Mantenimiento";
    case "gain_muscle": return "Ganar musculo";
    default: return goal;
  }
}

function getActivityLabel(level: string): string {
  switch (level) {
    case "sedentary": return "Sedentario";
    case "light": return "Ligero";
    case "moderate": return "Moderado";
    case "active": return "Activo";
    case "very_active": return "Muy activo";
    default: return level;
  }
}

export default function QuickStatsDashboard() {
  const { profile, nutritionalNeeds } = useUserProfile();
  const greeting = getGreeting();

  if (!profile || !nutritionalNeeds) return null;

  const healthTags = [];
  if (profile.hasAtherosclerosis) healthTags.push({ label: "Aterosclerosis", color: "#ef4444" });
  if (profile.hasInsulinResistance) healthTags.push({ label: "R. Insulina", color: "#3b82f6" });

  return (
    <div style={{
      maxWidth: 900, margin: "0 auto",
      padding: "24px 28px",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <style>{`
        @keyframes dashFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .macro-target-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 32px rgba(0,0,0,0.2) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
        @media (max-width: 600px) {
          .dashboard-widgets { grid-template-columns: 1fr !important; }
          .macro-targets-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Greeting Section */}
      <div style={{
        marginBottom: 28,
        animation: "dashFadeIn 0.6s ease both",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>{greeting.emoji}</span>
          <div>
            <h2 style={{
              fontSize: 26, fontWeight: 800, letterSpacing: -0.5, margin: 0,
              background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {greeting.text}
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 500 }}>
              {profile.gender === "male" ? "♂" : "♀"} {profile.age} anos, {profile.weight}kg, {profile.height}cm
              <span style={{ margin: "0 8px", opacity: 0.3 }}>|</span>
              {getActivityLabel(profile.activityLevel)}
              <span style={{ margin: "0 8px", opacity: 0.3 }}>|</span>
              {getGoalLabel(profile.goal)}
            </p>
          </div>
        </div>

        {/* Health condition tags */}
        {healthTags.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 8, marginLeft: 44 }}>
            {healthTags.map((tag, i) => (
              <span key={i} style={{
                padding: "4px 12px", borderRadius: 8,
                background: `${tag.color}15`, border: `1px solid ${tag.color}33`,
                fontSize: 11, fontWeight: 700, color: tag.color,
                letterSpacing: 0.3,
              }}>
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Macro Targets Quick View */}
      <div style={{ marginBottom: 24, animation: "dashFadeIn 0.6s ease 0.1s both" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 12 }}>
          Objetivos diarios
        </div>
        <div className="macro-targets-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}>
          {[
            { label: "Calorias", value: nutritionalNeeds.targetCalories, unit: "kcal", color: "#fff", gradient: "linear-gradient(135deg, #4EEBC2, #E88CED)" },
            { label: "Proteina", value: nutritionalNeeds.protein, unit: "g", color: "#4EEBC2", gradient: "linear-gradient(135deg, #4EEBC2, #4EEBC266)" },
            { label: "Carbos", value: nutritionalNeeds.carbs, unit: "g", color: "#F5B971", gradient: "linear-gradient(135deg, #F5B971, #F5B97166)" },
            { label: "Grasas", value: nutritionalNeeds.fats, unit: "g", color: "#E88CED", gradient: "linear-gradient(135deg, #E88CED, #E88CED66)" },
            { label: "Fibra", value: nutritionalNeeds.fiber, unit: "g", color: "#7CB8F7", gradient: "linear-gradient(135deg, #7CB8F7, #7CB8F766)" },
            { label: "Omega-3", value: nutritionalNeeds.omega3, unit: "g", color: "#38bdf8", gradient: "linear-gradient(135deg, #38bdf8, #38bdf866)" },
          ].map((item, i) => (
            <div key={i} className="macro-target-card" style={{
              padding: "14px 16px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "default",
              transition: "all 0.3s ease",
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span style={{
                  fontSize: 20, fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: item.gradient,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{item.value}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Widget Grid */}
      <div className="dashboard-widgets" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        animation: "dashFadeIn 0.6s ease 0.2s both",
      }}>
        <BMIGauge />
        <StreakCounter />
        <WaterTracker />
        <HealthTips />
      </div>
    </div>
  );
}
