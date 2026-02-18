"use client";

import { useState, useEffect, useCallback } from "react";

interface Tip {
  text: string;
  category: string;
  color: string;
}

const TIPS: Tip[] = [
  { text: "Beber agua antes de cada comida ayuda a controlar el apetito y mejora la digestion.", category: "Hidratacion", color: "#38bdf8" },
  { text: "Las proteinas en el desayuno estabilizan el azucar en sangre durante toda la manana.", category: "Nutricion", color: "#4EEBC2" },
  { text: "Dormir 7-9 horas optimiza las hormonas del hambre: leptina y grelina.", category: "Descanso", color: "#E88CED" },
  { text: "Los omega-3 del salmon y sardinas reducen la inflamacion arterial.", category: "Corazon", color: "#ef4444" },
  { text: "El ejercicio de fuerza aumenta la sensibilidad a la insulina hasta 48 horas.", category: "Ejercicio", color: "#F5B971" },
  { text: "Masticar lentamente (20-30 veces) mejora la absorcion de nutrientes.", category: "Habitos", color: "#a78bfa" },
  { text: "La fibra soluble de la avena atrapa el colesterol y lo elimina del cuerpo.", category: "Fibra", color: "#4EEBC2" },
  { text: "El ayuno intermitente 16:8 puede mejorar la sensibilidad a la insulina.", category: "Metabolismo", color: "#F5B971" },
  { text: "Los frutos rojos son los alimentos con mayor densidad de antioxidantes.", category: "Antioxidantes", color: "#ef4444" },
  { text: "Caminar 10 minutos despues de comer reduce los picos de glucosa en sangre.", category: "Ejercicio", color: "#F5B971" },
  { text: "El magnesio en las almendras y espinacas mejora la calidad del sueno.", category: "Minerales", color: "#38bdf8" },
  { text: "Cocinar con aceite de oliva extra virgen preserva los antioxidantes.", category: "Cocina", color: "#4EEBC2" },
];

export default function HealthTips() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TIPS.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goToPrev = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + TIPS.length) % TIPS.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const tip = TIPS[activeIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        padding: "20px 24px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .tip-nav:hover { background: rgba(255,255,255,0.1) !important; }
      `}</style>

      {/* Subtle animated gradient background */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${tip.color}00, ${tip.color}88, ${tip.color}00)`,
        transition: "background 0.5s ease",
      }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 }}>
          Consejo de salud
        </div>
        <div style={{
          padding: "3px 10px", borderRadius: 8,
          background: `${tip.color}15`, border: `1px solid ${tip.color}33`,
          fontSize: 10, fontWeight: 700, color: tip.color,
          textTransform: "uppercase", letterSpacing: 0.5,
          transition: "all 0.3s ease",
        }}>
          {tip.category}
        </div>
      </div>

      {/* Tip text */}
      <p style={{
        fontSize: 14, lineHeight: 1.6,
        color: "rgba(255,255,255,0.75)",
        fontWeight: 500,
        margin: "0 0 16px",
        minHeight: 44,
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}>
        {tip.text}
      </p>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {TIPS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsTransitioning(true); setTimeout(() => { setActiveIndex(i); setIsTransitioning(false); }, 300); }}
              style={{
                width: i === activeIndex ? 20 : 6, height: 6,
                borderRadius: 3,
                border: "none",
                background: i === activeIndex ? tip.color : "rgba(255,255,255,0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <button className="tip-nav" onClick={goToPrev} style={{
            width: 28, height: 28, borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", padding: 0,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="tip-nav" onClick={goToNext} style={{
            width: 28, height: 28, borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", padding: 0,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
