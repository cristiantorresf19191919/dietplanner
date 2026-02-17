"use client";

import { useState, useEffect, useRef } from "react";
import DietProgressTracker from "./DietProgressTracker";

interface Meal {
  name: string;
  desc: string;
  kcal: number;
  prot: number;
  carb: number;
  grasas: number;
  color: string;
}

interface DayTotals {
  kcal: number;
  prot: number;
  carb: number;
  grasas: number;
}

interface Day {
  day: string;
  type: string;
  color: string;
  totals: DayTotals;
  meals: Meal[];
}

const DAYS: Day[] = [
  {
    day: "Lunes",
    type: "Entreno",
    color: "#4EEBC2",
    totals: { kcal: 2597, prot: 189.1, carb: 300.2, grasas: 73.7 },
    meals: [
      { name: "1º Desayuno", desc: "200ml leche semi + 10g chía + 30g avena + 50g fresas + 2 huevos", kcal: 426, prot: 31.7, carb: 41.3, grasas: 15.3, color: "#4EEBC2" },
      { name: "2º Desayuno", desc: "Tortita (7.5g harina almendra + 1.5 huevos) + 50g cottage + 75g fruta", kcal: 244, prot: 18.6, carb: 13.8, grasas: 13.2, color: "#F5B971" },
      { name: "Almuerzo", desc: "150g pechuga pollo + 300g habichuelas + 100g patata", kcal: 341, prot: 51.9, carb: 21.0, grasas: 6.0, color: "#E88CED" },
      { name: "Merienda", desc: "67g atún + 100g cottage + 250g arroz integral + 75g granada", kcal: 1087, prot: 48.3, carb: 196.3, grasas: 12.7, color: "#F5B971" },
      { name: "Cena", desc: "150g bacalao + 100g calabacín + 10g AOVE", kcal: 230, prot: 28.2, carb: 3.1, grasas: 11.3, color: "#7CB8F7" },
      { name: "Post-cena", desc: "85g yogur de oveja + 20g almendras", kcal: 192, prot: 8.5, carb: 7.7, grasas: 15.1, color: "#4EEBC2" },
    ],
  },
  {
    day: "Martes",
    type: "Entreno",
    color: "#F5B971",
    totals: { kcal: 2793, prot: 196.7, carb: 310.6, grasas: 87.5 },
    meals: [
      { name: "1º Desayuno", desc: "200ml leche semi + 10g chía + 30g avena + 50g fresas + 2 huevos", kcal: 426, prot: 31.7, carb: 41.3, grasas: 15.3, color: "#4EEBC2" },
      { name: "2º Desayuno", desc: "Tortita + 50g cottage + 150g fruta (arándanos + kiwi)", kcal: 287, prot: 19.1, carb: 24.6, grasas: 13.4, color: "#F5B971" },
      { name: "Almuerzo", desc: "150g pavo + 300g brócoli + 100g patata", kcal: 305, prot: 51.9, carb: 19.8, grasas: 2.7, color: "#E88CED" },
      { name: "Merienda", desc: "67g atún + 100g cottage + 250g arroz integral + 75g granada", kcal: 1087, prot: 48.3, carb: 196.3, grasas: 12.7, color: "#F5B971" },
      { name: "Cena", desc: "150g salmón + 100g espárragos + 10g AOVE", kcal: 304, prot: 37.4, carb: 3.9, grasas: 22.7, color: "#7CB8F7" },
      { name: "Post-cena", desc: "85g yogur de oveja + 20g almendras", kcal: 192, prot: 8.5, carb: 7.7, grasas: 15.1, color: "#4EEBC2" },
    ],
  },
  {
    day: "Miércoles",
    type: "Entreno",
    color: "#E88CED",
    totals: { kcal: 2559, prot: 193.2, carb: 287.9, grasas: 73.9 },
    meals: [
      { name: "1º Desayuno", desc: "200ml leche semi + 10g chía + 30g avena + 50g fresas + 2 huevos", kcal: 426, prot: 31.7, carb: 41.3, grasas: 15.3, color: "#4EEBC2" },
      { name: "2º Desayuno", desc: "Tortita + 50g cottage + 50g fruta (mix)", kcal: 230, prot: 18.4, carb: 10.1, grasas: 13.1, color: "#F5B971" },
      { name: "Almuerzo", desc: "150g pechuga pollo + 300g espinacas + 100g patata", kcal: 341, prot: 51.9, carb: 21.0, grasas: 6.0, color: "#E88CED" },
      { name: "Merienda", desc: "67g atún + 80g cottage + 250g arroz integral + 75g granada", kcal: 1087, prot: 44.3, carb: 196.3, grasas: 12.7, color: "#F5B971" },
      { name: "Cena", desc: "150g merluza + 100g coliflor + 10g AOVE", kcal: 250, prot: 31.9, carb: 5.0, grasas: 11.8, color: "#7CB8F7" },
      { name: "Post-cena", desc: "85g yogur de oveja + 20g almendras", kcal: 192, prot: 8.5, carb: 7.7, grasas: 15.1, color: "#4EEBC2" },
    ],
  },
  {
    day: "Jueves",
    type: "Descanso",
    color: "#7CB8F7",
    totals: { kcal: 2053, prot: 160.7, carb: 185.3, grasas: 76.5 },
    meals: [
      { name: "1º Desayuno", desc: "200ml leche semi + 10g chía + 30g avena + 50g fresas + 1 huevo", kcal: 354, prot: 24.6, carb: 37.9, grasas: 12.6, color: "#4EEBC2" },
      { name: "2º Desayuno", desc: "Tortita + 50g cottage + 75g fruta (arándanos + frambuesas)", kcal: 244, prot: 18.6, carb: 13.8, grasas: 13.2, color: "#F5B971" },
      { name: "Almuerzo", desc: "150g ternera (lomo) + 100g coles de Bruselas", kcal: 250, prot: 42.4, carb: 9.0, grasas: 18.3, color: "#E88CED" },
      { name: "Merienda", desc: "67g atún + 80g cottage + 150g arroz integral", kcal: 546, prot: 34.3, carb: 114.8, grasas: 9.8, color: "#F5B971" },
      { name: "Cena", desc: "150g bacalao + 100g espárragos + 10g AOVE", kcal: 230, prot: 28.2, carb: 3.9, grasas: 11.3, color: "#7CB8F7" },
      { name: "Post-cena", desc: "85g yogur de oveja + 20g almendras", kcal: 192, prot: 8.5, carb: 7.7, grasas: 15.1, color: "#4EEBC2" },
    ],
  },
  {
    day: "Viernes",
    type: "Entreno",
    color: "#4EEBC2",
    totals: { kcal: 2790, prot: 195.6, carb: 299.8, grasas: 91.3 },
    meals: [
      { name: "1º Desayuno", desc: "200ml leche semi + 10g chía + 30g avena + 50g fresas + 2 huevos", kcal: 426, prot: 31.7, carb: 41.3, grasas: 15.3, color: "#4EEBC2" },
      { name: "2º Desayuno", desc: "Tortita + 50g cottage + 150g fruta (arándanos + kiwi)", kcal: 287, prot: 19.1, carb: 24.6, grasas: 13.4, color: "#F5B971" },
      { name: "Almuerzo", desc: "150g pechuga pollo + 300g calabacín + 100g patata", kcal: 463, prot: 47.6, carb: 28.7, grasas: 18.7, color: "#E88CED" },
      { name: "Merienda", desc: "67g atún + 100g cottage + 250g arroz integral + 75g granada", kcal: 1087, prot: 48.3, carb: 196.3, grasas: 12.7, color: "#F5B971" },
      { name: "Cena", desc: "150g salmón + 100g espinacas + 10g AOVE", kcal: 304, prot: 37.4, carb: 3.6, grasas: 22.7, color: "#7CB8F7" },
      { name: "Post-cena", desc: "85g yogur de oveja + 20g almendras", kcal: 192, prot: 8.5, carb: 7.7, grasas: 15.1, color: "#4EEBC2" },
    ],
  },
  {
    day: "Sábado",
    type: "Entreno",
    color: "#F5B971",
    totals: { kcal: 2692, prot: 200.3, carb: 287.4, grasas: 84.3 },
    meals: [
      { name: "1º Desayuno", desc: "2 arepas de maíz + 2 huevos + 100g pollo deshilachado", kcal: 459, prot: 47.6, carb: 34.3, grasas: 13.2, color: "#4EEBC2" },
      { name: "2º Desayuno", desc: "75g fruta (frambuesas + arándanos)", kcal: 230, prot: 18.4, carb: 10.1, grasas: 13.1, color: "#F5B971" },
      { name: "Almuerzo", desc: "150g ternera (lomo) + 300g espárragos + 100g patata", kcal: 463, prot: 47.6, carb: 28.7, grasas: 18.7, color: "#E88CED" },
      { name: "Merienda", desc: "67g atún + 100g cottage + 250g arroz integral + 75g granada", kcal: 1087, prot: 48.3, carb: 196.3, grasas: 12.7, color: "#F5B971" },
      { name: "Cena", desc: "150g bacalao + 100g brócoli + 10g AOVE", kcal: 230, prot: 28.2, carb: 6.6, grasas: 11.3, color: "#7CB8F7" },
      { name: "Post-cena", desc: "85g yogur de oveja + 20g almendras", kcal: 192, prot: 8.5, carb: 7.7, grasas: 15.1, color: "#4EEBC2" },
    ],
  },
  {
    day: "Domingo",
    type: "Descanso",
    color: "#E88CED",
    totals: { kcal: 2063, prot: 192.4, carb: 170.7, grasas: 67.2 },
    meals: [
      { name: "1º Desayuno", desc: "2 arepas de maíz + 2 huevos + 100g pollo deshilachado", kcal: 459, prot: 47.6, carb: 34.3, grasas: 13.2, color: "#4EEBC2" },
      { name: "2º Desayuno", desc: "50g arándanos", kcal: 230, prot: 18.4, carb: 10.1, grasas: 13.1, color: "#F5B971" },
      { name: "Almuerzo", desc: "150g pechuga pollo + 100g espinacas", kcal: 271, prot: 49.4, carb: 3.6, grasas: 5.8, color: "#E88CED" },
      { name: "Merienda", desc: "67g atún + 80g cottage + 150g arroz integral", kcal: 661, prot: 36.7, carb: 110.0, grasas: 8.2, color: "#F5B971" },
      { name: "Cena", desc: "150g merluza + 100g coliflor + 10g AOVE", kcal: 250, prot: 31.9, carb: 5.0, grasas: 11.8, color: "#7CB8F7" },
      { name: "Post-cena", desc: "85g yogur de oveja + 20g almendras", kcal: 192, prot: 8.5, carb: 7.7, grasas: 15.1, color: "#4EEBC2" },
    ],
  },
];

const WEEK_TOTALS = { kcal: 17547, prot: 1327.9, carb: 1841.9, grasas: 554.4 };

const CASCADE_DURATION = 0.6;
const CASCADE_STAGGER = 0.08;

/* ── Loader Screen ────────────────────────────────────────── */
function Loader({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1800);
    const t2 = setTimeout(onComplete, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "#0D0F18",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 28,
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: fadeOut ? "none" : "auto",
    }}>
      {/* Animated rings */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div className="loader-ring-outer" style={{
          position: "absolute", inset: 0,
          border: "3px solid transparent",
          borderTopColor: "#4EEBC2",
          borderRightColor: "#4EEBC2",
          borderRadius: "50%",
          animation: "loaderSpin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        }} />
        <div className="loader-ring-inner" style={{
          position: "absolute", inset: 12,
          border: "3px solid transparent",
          borderBottomColor: "#E88CED",
          borderLeftColor: "#E88CED",
          borderRadius: "50%",
          animation: "loaderSpin 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28,
          animation: "loaderPulse 1.8s ease-in-out infinite",
        }}>🥗</div>
      </div>

      {/* Text */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 20, fontWeight: 800, letterSpacing: -0.3,
          background: "linear-gradient(135deg, #4EEBC2, #E88CED)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "loaderPulse 1.8s ease-in-out infinite",
        }}>
          Mi Dieta
        </div>
        <div style={{
          fontSize: 11, color: "rgba(255,255,255,0.3)",
          letterSpacing: 3, textTransform: "uppercase", fontWeight: 600,
          marginTop: 8,
        }}>
          Cargando plan semanal
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#4EEBC2",
            animation: `loaderDot 1.4s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer-wrap" style={{
      position: "relative", zIndex: 2,
      maxWidth: 900, margin: "0 auto",
      padding: "0 28px 32px",
    }}>
      {/* Gradient divider */}
      <div style={{
        height: 1, marginBottom: 28,
        background: "linear-gradient(90deg, transparent, rgba(78,235,194,0.2) 30%, rgba(232,140,237,0.2) 70%, transparent)",
      }} />

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{
            fontSize: 10, color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase", letterSpacing: 2, fontWeight: 700,
          }}>
            Creado por
          </span>
          <a
            href="https://agencypartner2.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{
              fontSize: 15, fontWeight: 700, letterSpacing: -0.2,
              background: "linear-gradient(135deg, #4EEBC2, #E88CED)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textDecoration: "none",
              transition: "opacity 0.3s ease",
            }}
          >
            CristianScript
          </a>
        </div>

        <a
          href="https://agencypartner2.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-cta"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.5)",
            fontSize: 13, fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
        >
          <span>¿Necesitas más páginas?</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

/* ── Circular Progress Ring ───────────────────────────────── */
function ProgressRing({ value, max, size = 140, strokeWidth = 10, color }: {
  value: number; max: number; size?: number; strokeWidth?: number; color: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const [animPct, setAnimPct] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimPct(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={`url(#grad-${color.replace("#", "")})`}
        strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - animPct)}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
      />
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#E88CED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Meal Card (pill-style, expandable) ───────────────────── */
function MealCard({ meal, checked, onToggle, index, cascadeDelay, isExpanded, onExpand }: {
  meal: Meal; checked: boolean; onToggle: () => void; index: number; cascadeDelay?: number;
  isExpanded: boolean; onExpand: () => void;
}) {
  const isCascade = cascadeDelay !== undefined;
  return (
    <div
      style={{
        opacity: isCascade ? 0 : undefined,
        animation: isCascade
          ? `cascadeIn ${CASCADE_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${cascadeDelay}s both`
          : `slideUp .5s ${index * 0.06}s both ease`,
      }}
    >
      <div
        className="meal-card"
        style={{
          display: "flex", alignItems: "center", gap: 12,
          background: checked
            ? `linear-gradient(135deg, ${meal.color}22, ${meal.color}08)`
            : "rgba(255,255,255,0.025)",
          border: `1px solid ${checked ? meal.color + "55" : "rgba(255,255,255,0.06)"}`,
          borderRadius: isExpanded ? "16px 16px 0 0" : 16,
          padding: "14px 18px", cursor: "pointer",
          transition: "all .3s ease",
          position: "relative", overflow: "hidden",
        }}
      >
        {checked && (
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 4,
            background: `linear-gradient(180deg, ${meal.color}, transparent)`,
            borderRadius: "4px 0 0 4px",
          }} />
        )}

        {/* Checkbox */}
        <div className="meal-check" onClick={(e) => { e.stopPropagation(); onToggle(); }} style={{
          width: 26, height: 26, borderRadius: 8, flexShrink: 0,
          border: checked ? "none" : `2px solid rgba(255,255,255,0.15)`,
          background: checked ? meal.color : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .25s ease",
          boxShadow: checked ? `0 0 12px ${meal.color}55` : "none",
          cursor: "pointer",
        }}>
          {checked && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D0F18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>

        {/* Pill tag */}
        <div className="meal-pill" onClick={onExpand} style={{
          padding: "4px 14px", borderRadius: 20,
          background: meal.color + "22", color: meal.color,
          fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0,
          cursor: "pointer",
        }}>
          {meal.name}
        </div>

        {/* Description */}
        <div className="meal-desc" onClick={onExpand} style={{
          flex: 1, fontSize: 13, color: checked ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.72)",
          textDecoration: checked ? "line-through" : "none",
          lineHeight: 1.4, minWidth: 0,
          transition: "color .3s ease",
          cursor: "pointer",
        }}>
          {meal.desc}
        </div>

        {/* Kcal badge + expand chevron */}
        <div onClick={onExpand} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div className="meal-kcal" style={{
            padding: "5px 12px", borderRadius: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
            color: checked ? meal.color : "rgba(255,255,255,0.55)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {meal.kcal} kcal
          </div>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "transform 0.25s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded Macro Details */}
      {isExpanded && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8,
          padding: "12px 18px 14px",
          background: checked
            ? `linear-gradient(135deg, ${meal.color}11, ${meal.color}05)`
            : "rgba(255,255,255,0.015)",
          border: `1px solid ${checked ? meal.color + "33" : "rgba(255,255,255,0.05)"}`,
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
          animation: "slideUp 0.2s ease",
        }}>
          <div style={{ textAlign: "center", padding: "8px 4px", background: "rgba(78,235,194,0.06)", borderRadius: 10, border: "1px solid rgba(78,235,194,0.1)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700, marginBottom: 4 }}>Prot</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#4EEBC2", fontFamily: "'JetBrains Mono', monospace" }}>{meal.prot}g</div>
          </div>
          <div style={{ textAlign: "center", padding: "8px 4px", background: "rgba(245,185,113,0.06)", borderRadius: 10, border: "1px solid rgba(245,185,113,0.1)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700, marginBottom: 4 }}>Carbs</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F5B971", fontFamily: "'JetBrains Mono', monospace" }}>{meal.carb}g</div>
          </div>
          <div style={{ textAlign: "center", padding: "8px 4px", background: "rgba(232,140,237,0.06)", borderRadius: 10, border: "1px solid rgba(232,140,237,0.1)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700, marginBottom: 4 }}>Grasas</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#E88CED", fontFamily: "'JetBrains Mono', monospace" }}>{meal.grasas}g</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Macro Bar ────────────────────────────────────────────── */
function MacroBar({ label, value, max, color, unit = "g" }: {
  label: string; value: number; max: number; color: string; unit?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "baseline" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>{value}{unit}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 3, width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          boxShadow: `0 0 10px ${color}44`,
          transition: "width 1s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </div>
  );
}

/* ── Day Navigation Pill ──────────────────────────────────── */
function DayPill({ day, isActive, isComplete, onClick, color }: {
  day: Day; isActive: boolean; isComplete: boolean; onClick: () => void; color: string;
}) {
  const abbr = day.day.slice(0, 3);
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        padding: "10px 6px", border: "none", cursor: "pointer",
        background: "transparent", position: "relative", fontFamily: "inherit",
        transition: "transform .2s ease",
        transform: isActive ? "scale(1.08)" : "scale(1)",
      }}
    >
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
        color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
        textTransform: "uppercase",
      }}>{abbr}</span>

      <div style={{
        width: 42, height: 42, borderRadius: 14,
        background: isActive ? `linear-gradient(135deg, ${color}, ${color}88)` : "rgba(255,255,255,0.04)",
        border: isActive ? "none" : `1px solid rgba(255,255,255,0.08)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: isActive ? `0 4px 20px ${color}44` : "none",
        transition: "all .3s ease",
        position: "relative",
      }}>
        {isComplete ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#0D0F18" : "#4EEBC2"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span style={{
            fontSize: 15, fontWeight: 700,
            color: isActive ? "#0D0F18" : "rgba(255,255,255,0.3)",
          }}>
            {DAYS.indexOf(day) + 1}
          </span>
        )}
      </div>

      <span style={{
        fontSize: 9, fontWeight: 600, letterSpacing: 0.5,
        color: day.type === "Entreno" ? "#4EEBC2" : "#F5B971",
        opacity: isActive ? 1 : 0.5,
        textTransform: "uppercase",
      }}>{day.type === "Entreno" ? "🏋️" : "😴"}</span>
    </button>
  );
}

/* ── Completion Modal ─────────────────────────────────────── */
function CompletionModal({ count, onClose }: { count: number; onClose: () => void }) {
  if (count === 0) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      animation: "fadeIn .3s ease",
    }} onClick={onClose}>
      <div className="modal-inner" onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg, #1A1D2E, #14162A)",
        borderRadius: 24, padding: "36px 44px", textAlign: "center",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        animation: "popIn .4s ease",
        position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 20,
          background: "none", border: "none", color: "rgba(255,255,255,0.3)",
          cursor: "pointer", fontSize: 20,
        }}>✕</button>

        <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 20px" }}>
          <ProgressRing value={count} max={42} size={140} strokeWidth={10} color="#4EEBC2" />
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 42, fontWeight: 800, color: "#4EEBC2",
            fontFamily: "'JetBrains Mono', monospace",
          }}>{count}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#4EEBC2" stroke="none">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span style={{ fontSize: 16, color: "#4EEBC2", fontWeight: 600 }}>
            {count === 42 ? "¡Semana Completada!" : `${count}/42 Comidas`}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main App ─────────────────────────────────────────────── */
export default function DietPlanner() {
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    DAYS.forEach((_, di) => { for (let mi = 0; mi < 6; mi++) init[`${di}-${mi}`] = false; });
    return init;
  });
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showLoader) {
      const t = setTimeout(() => setIsFirstLoad(false), 1600);
      return () => clearTimeout(t);
    }
  }, [showLoader]);

  const toggle = (di: number, mi: number) => {
    setChecked(prev => ({ ...prev, [`${di}-${mi}`]: !prev[`${di}-${mi}`] }));
  };

  const dayComplete = (di: number) => DAYS[di].meals.every((_, mi) => checked[`${di}-${mi}`]);
  const dayMealsChecked = (di: number) => DAYS[di].meals.filter((_, mi) => checked[`${di}-${mi}`]).length;
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const weekPct = Math.round((totalChecked / 42) * 100);

  const dayData = DAYS[activeDay];
  const dayCheckedCount = dayMealsChecked(activeDay);
  const dayPct = Math.round((dayCheckedCount / 6) * 100);

  const completedDays = DAYS.filter((_, i) => dayComplete(i)).length;

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setExpandedMeal(null);
  }, [activeDay]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0F18",
      fontFamily: "'Outfit', 'SF Pro Display', sans-serif",
      color: "#fff",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes popIn { from { opacity:0; transform:scale(.9) } to { opacity:1; transform:scale(1) } }
        @keyframes pulse { 0%,100% { opacity:.6 } 50% { opacity:1 } }
        @keyframes gradientShift { 0% { background-position:0% 50% } 50% { background-position:100% 50% } 100% { background-position:0% 50% } }
        @keyframes cascadeIn {
          from { opacity: 0; transform: translateY(28px) scale(0.98); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes loaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loaderPulse {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes loaderDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

        /* Hover effects */
        .meal-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          border-color: rgba(255,255,255,0.1) !important;
        }
        .meal-card:active {
          transform: translateY(0) scale(0.995);
        }
        .footer-link:hover { opacity: 0.8; }
        .footer-cta:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(78,235,194,0.15) !important;
          color: #4EEBC2 !important;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.1) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        @media (max-width: 600px) {
          .meal-card { flex-wrap: wrap !important; gap: 8px !important; padding: 12px 14px !important; }
          .meal-card .meal-pill { order: 1; }
          .meal-card .meal-kcal { order: 2; margin-left: auto; }
          .meal-card .meal-desc { order: 3; width: 100%; flex-basis: 100% !important; }
          .meal-card .meal-check { order: 0; }
          .day-nav { overflow-x: auto !important; justify-content: flex-start !important; gap: 4px !important; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .day-nav::-webkit-scrollbar { display: none; }
          .macro-bars { flex-direction: column !important; }
          .modal-inner { padding: 24px 20px !important; margin: 0 16px; max-width: calc(100vw - 32px); }
          .header-wrap { padding: 16px 16px 0 !important; }
          .content-wrap { padding: 16px 16px 40px !important; }
          .footer-wrap { padding: 0 16px 24px !important; }
          .footer-cta { width: 100%; justify-content: center !important; }
        }
      `}</style>

      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}

      {/* BG Texture */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(78,235,194,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(78,235,194,0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Header */}
      <div className="header-wrap" style={{
        padding: "28px 28px 0", position: "relative", zIndex: 2,
        maxWidth: 900, margin: "0 auto",
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 24,
          opacity: isFirstLoad ? 0 : 1,
          animation: isFirstLoad ? `cascadeIn ${CASCADE_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${0 * CASCADE_STAGGER}s both` : "none",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 2, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
              PLAN SEMANAL
            </div>
            <h1 style={{
              fontSize: 28, fontWeight: 800, letterSpacing: -0.5,
              background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Mi Dieta 🥗
            </h1>
          </div>

          {/* Weekly Progress Circle */}
          <div onClick={() => setShowModal(true)} style={{ cursor: "pointer", position: "relative" }}>
            <ProgressRing value={totalChecked} max={42} size={64} strokeWidth={5} color="#4EEBC2" />
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, color: "#4EEBC2",
              fontFamily: "'JetBrains Mono', monospace",
            }}>{weekPct}%</div>
          </div>
        </div>

        {/* Week Stats Strip */}
        <div style={{
          display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap",
          opacity: isFirstLoad ? 0 : 1,
          animation: isFirstLoad ? `cascadeIn ${CASCADE_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${1 * CASCADE_STAGGER}s both` : "none",
        }}>
          {[
            { label: "Días completados", val: `${completedDays}/7`, color: "#4EEBC2" },
            { label: "Comidas hechas", val: `${totalChecked}/42`, color: "#F5B971" },
            { label: "Semana kcal", val: WEEK_TOTALS.kcal.toLocaleString(), color: "#E88CED" },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{
              flex: 1, minWidth: 120, padding: "12px 16px", borderRadius: 14,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.3s ease",
              cursor: "default",
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Day Navigation */}
        <div className="day-nav" style={{
          display: "flex", justifyContent: "space-between",
          background: "rgba(255,255,255,0.02)",
          borderRadius: 20, padding: "8px 12px",
          border: "1px solid rgba(255,255,255,0.05)",
          marginBottom: 6,
          opacity: isFirstLoad ? 0 : 1,
          animation: isFirstLoad ? `cascadeIn ${CASCADE_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${2 * CASCADE_STAGGER}s both` : "none",
        }}>
          {DAYS.map((d, i) => (
            <DayPill
              key={i} day={d} isActive={i === activeDay}
              isComplete={dayComplete(i)}
              onClick={() => setActiveDay(i)}
              color={d.color}
            />
          ))}
        </div>
      </div>

      {/* Day Content */}
      <div className="content-wrap" ref={contentRef} style={{
        maxWidth: 900, margin: "0 auto", padding: "20px 28px 40px",
        position: "relative", zIndex: 2,
      }}>
        {/* Day Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 20,
          opacity: isFirstLoad ? 0 : 1,
          animation: isFirstLoad ? `cascadeIn ${CASCADE_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${3 * CASCADE_STAGGER}s both` : "slideUp .4s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 16,
              background: `linear-gradient(135deg, ${dayData.color}, ${dayData.color}66)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, boxShadow: `0 4px 16px ${dayData.color}33`,
            }}>
              {dayData.type === "Entreno" ? "💪" : "🧘"}
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>{dayData.day}</h2>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "3px 10px", borderRadius: 8,
                background: dayData.type === "Entreno" ? "#4EEBC222" : "#F5B97122",
                fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                color: dayData.type === "Entreno" ? "#4EEBC2" : "#F5B971",
                textTransform: "uppercase",
              }}>
                {dayData.type}
              </div>
            </div>
          </div>

          {/* Day progress mini ring */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>{dayCheckedCount}/6</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: dayPct === 100 ? "#4EEBC2" : "#fff" }}>
                {dayPct === 100 ? "✓ Completo" : `${dayPct}%`}
              </div>
            </div>
            <ProgressRing value={dayCheckedCount} max={6} size={48} strokeWidth={4} color={dayData.color} />
          </div>
        </div>

        {/* Daily Macros Summary */}
        <div className="macro-bars" style={{
          display: "flex", gap: 16, marginBottom: 22, flexWrap: "wrap",
          padding: "16px 20px", borderRadius: 18,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          opacity: isFirstLoad ? 0 : 1,
          animation: isFirstLoad ? `cascadeIn ${CASCADE_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${4 * CASCADE_STAGGER}s both` : "slideUp .4s .05s both ease",
        }}>
          <div style={{ width: "100%", display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Macros del día</span>
            <span style={{
              fontSize: 22, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
              background: `linear-gradient(135deg, ${dayData.color}, #E88CED)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {dayData.totals.kcal.toLocaleString()} kcal
            </span>
          </div>
          <MacroBar label="Proteínas" value={dayData.totals.prot} max={220} color="#4EEBC2" />
          <MacroBar label="Carbos" value={dayData.totals.carb} max={320} color="#F5B971" />
          <MacroBar label="Grasas" value={dayData.totals.grasas} max={100} color="#E88CED" />
        </div>

        {/* Meals List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {dayData.meals.map((meal, mi) => {
            const mealKey = `${activeDay}-${mi}`;
            return (
              <MealCard
                key={mealKey}
                meal={meal}
                checked={checked[mealKey]}
                onToggle={() => toggle(activeDay, mi)}
                index={mi}
                cascadeDelay={isFirstLoad ? 5 * CASCADE_STAGGER + mi * 0.07 : undefined}
                isExpanded={expandedMeal === mealKey}
                onExpand={() => setExpandedMeal(expandedMeal === mealKey ? null : mealKey)}
              />
            );
          })}
        </div>

        {/* Quick Macros per Meal (expanded view) */}
        {dayCheckedCount > 0 && (
          <div style={{
            marginTop: 20, padding: "16px 20px", borderRadius: 18,
            background: "rgba(78,235,194,0.03)",
            border: "1px solid rgba(78,235,194,0.08)",
            animation: "slideUp .4s ease",
          }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 12 }}>
              Progreso consumido
            </div>
            <div className="macro-bars" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {(() => {
                let kcal = 0, prot = 0, carb = 0, grasas = 0;
                dayData.meals.forEach((m, mi) => {
                  if (checked[`${activeDay}-${mi}`]) {
                    kcal += m.kcal; prot += m.prot; carb += m.carb; grasas += m.grasas;
                  }
                });
                return (
                  <>
                    <MacroBar label="Kcal" value={kcal} max={dayData.totals.kcal} color="#fff" unit=" kcal" />
                    <MacroBar label="Prot" value={+prot.toFixed(1)} max={dayData.totals.prot} color="#4EEBC2" />
                    <MacroBar label="Carb" value={+carb.toFixed(1)} max={dayData.totals.carb} color="#F5B971" />
                    <MacroBar label="Grasas" value={+grasas.toFixed(1)} max={dayData.totals.grasas} color="#E88CED" />
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Progress Tracker */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 28px 0" }}>
        <div style={{
          height: 1, marginBottom: 32,
          background: "linear-gradient(90deg, transparent, rgba(78,235,194,0.15) 30%, rgba(232,140,237,0.15) 70%, transparent)",
        }} />
        <DietProgressTracker dietType="general" />
      </div>

      {/* Footer */}
      <Footer />

      {showModal && <CompletionModal count={totalChecked} onClose={() => setShowModal(false)} />}
    </div>
  );
}
