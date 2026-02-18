"use client";

import { useUserProfile } from "@/context/UserProfileContext";

interface BMIZone {
  label: string;
  min: number;
  max: number;
  color: string;
  advice: string;
}

const BMI_ZONES: BMIZone[] = [
  { label: "Bajo peso", min: 0, max: 18.5, color: "#38bdf8", advice: "Aumentar ingesta calorica" },
  { label: "Normal", min: 18.5, max: 25, color: "#4EEBC2", advice: "Mantener habitos saludables" },
  { label: "Sobrepeso", min: 25, max: 30, color: "#F5B971", advice: "Ajustar dieta y ejercicio" },
  { label: "Obesidad", min: 30, max: 45, color: "#ef4444", advice: "Consultar especialista" },
];

function getBMIZone(bmi: number): BMIZone {
  return BMI_ZONES.find(z => bmi >= z.min && bmi < z.max) || BMI_ZONES[BMI_ZONES.length - 1];
}

export default function BMIGauge() {
  const { profile, nutritionalNeeds } = useUserProfile();

  if (!profile || !nutritionalNeeds) return null;

  const bmi = profile.weight / Math.pow(profile.height / 100, 2);
  const zone = getBMIZone(bmi);

  // Map BMI (14-40) to angle (0-180)
  const clampedBmi = Math.max(14, Math.min(40, bmi));
  const angle = ((clampedBmi - 14) / (40 - 14)) * 180;

  const gaugeSize = 200;
  const cx = gaugeSize / 2;
  const cy = gaugeSize / 2 + 10;
  const radius = 75;
  const strokeWidth = 14;

  // Create arc segments for each zone
  function arcPath(startAngle: number, endAngle: number, r: number): string {
    const startRad = (Math.PI * (180 + startAngle)) / 180;
    const endRad = (Math.PI * (180 + endAngle)) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  // Needle position
  const needleRad = (Math.PI * (180 + angle)) / 180;
  const needleX = cx + (radius - 8) * Math.cos(needleRad);
  const needleY = cy + (radius - 8) * Math.sin(needleRad);

  return (
    <div style={{
      padding: "20px 24px",
      borderRadius: 20,
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
    }}>
      <style>{`
        @keyframes needleSwing {
          0% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 12 }}>
        Indice de masa corporal
      </div>

      {/* SVG Gauge */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <svg width={gaugeSize} height={gaugeSize / 2 + 30} viewBox={`0 0 ${gaugeSize} ${gaugeSize / 2 + 30}`}>
          {/* Background arc */}
          <path d={arcPath(0, 180, radius)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} strokeLinecap="round" />

          {/* Zone arcs */}
          {BMI_ZONES.map((z, i) => {
            const startPct = ((z.min - 14) / (40 - 14)) * 180;
            const endPct = ((Math.min(z.max, 40) - 14) / (40 - 14)) * 180;
            return (
              <path
                key={i}
                d={arcPath(Math.max(0, startPct), Math.min(180, endPct), radius)}
                fill="none"
                stroke={z.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={0.6}
              />
            );
          })}

          {/* Needle */}
          <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: "needleSwing 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
            <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={cx} cy={cy} r={5} fill="#fff" />
          </g>

          {/* Center value */}
          <text x={cx} y={cy + 28} textAnchor="middle" fill={zone.color} fontSize="22" fontWeight="800" fontFamily="'JetBrains Mono', monospace">
            {bmi.toFixed(1)}
          </text>
        </svg>
      </div>

      {/* Zone label */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 16px", borderRadius: 20,
        background: `${zone.color}15`,
        border: `1px solid ${zone.color}33`,
        animation: "fadeInUp 0.6s ease 0.8s both",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: zone.color }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: zone.color }}>{zone.label}</span>
      </div>

      {/* Stats row */}
      <div style={{
        display: "flex", justifyContent: "space-around", marginTop: 16, padding: "12px 0",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        animation: "fadeInUp 0.6s ease 1s both",
      }}>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>TMB</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#4EEBC2", fontFamily: "'JetBrains Mono', monospace" }}>{nutritionalNeeds.bmr}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>TDEE</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#F5B971", fontFamily: "'JetBrains Mono', monospace" }}>{nutritionalNeeds.tdee}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>Meta</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#E88CED", fontFamily: "'JetBrains Mono', monospace" }}>{nutritionalNeeds.targetCalories}</div>
        </div>
      </div>
    </div>
  );
}
