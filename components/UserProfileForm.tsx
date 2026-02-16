"use client";

import { useState } from "react";
import { UserProfile, useUserProfile } from "@/context/UserProfileContext";

export default function UserProfileForm({ onComplete }: { onComplete?: () => void }) {
  const { setProfile, profile: existingProfile } = useUserProfile();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>(
    existingProfile || {
      age: 30,
      weight: 70,
      height: 170,
      gender: "male",
      activityLevel: "moderate",
      goal: "maintain",
      hasAtherosclerosis: false,
      hasInsulinResistance: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setProfile(formData);
      onComplete?.();
    }
  };

  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>🥗 Perfil Nutricional Personalizado</h2>
          <p style={styles.subtitle}>
            Como nutricionista experto, necesito algunos datos para crear tu plan perfecto
          </p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${(step / 3) * 100}%` }} />
          </div>
          <p style={styles.stepLabel}>
            Paso {step} de 3
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {step === 1 && (
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>📊 Datos Básicos</h3>

              <div style={styles.field}>
                <label style={styles.label}>Edad (años)</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateField("age", parseInt(e.target.value))}
                  min="15"
                  max="100"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Peso (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateField("weight", parseFloat(e.target.value))}
                  min="40"
                  max="200"
                  step="0.1"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Altura (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateField("height", parseInt(e.target.value))}
                  min="140"
                  max="220"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Sexo</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) => updateField("gender", e.target.value)}
                      style={styles.radio}
                    />
                    <span>👨 Masculino</span>
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) => updateField("gender", e.target.value)}
                      style={styles.radio}
                    />
                    <span>👩 Femenino</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>💪 Actividad y Objetivos</h3>

              <div style={styles.field}>
                <label style={styles.label}>Nivel de Actividad Física</label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) => updateField("activityLevel", e.target.value)}
                  style={styles.select}
                >
                  <option value="sedentary">Sedentario (poco o ningún ejercicio)</option>
                  <option value="light">Ligero (ejercicio 1-3 días/semana)</option>
                  <option value="moderate">Moderado (ejercicio 3-5 días/semana)</option>
                  <option value="active">Activo (ejercicio 6-7 días/semana)</option>
                  <option value="very_active">Muy Activo (ejercicio intenso diario)</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Tu Objetivo Principal</label>
                <select
                  value={formData.goal}
                  onChange={(e) => updateField("goal", e.target.value)}
                  style={styles.select}
                >
                  <option value="lose_weight">🔥 Perder Grasa Corporal</option>
                  <option value="maintain">⚖️ Mantener Peso</option>
                  <option value="gain_muscle">💪 Ganar Masa Muscular</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>🏥 Condiciones de Salud</h3>
              <p style={styles.healthNote}>
                Esto me permitirá adaptar tu plan nutricional a tus necesidades específicas
              </p>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.hasAtherosclerosis}
                  onChange={(e) => updateField("hasAtherosclerosis", e.target.checked)}
                  style={styles.checkbox}
                />
                <div>
                  <strong>🫀 Aterosclerosis o Riesgo Cardiovascular</strong>
                  <p style={styles.checkboxDesc}>
                    Adaptaré tu dieta con grasas saludables y antioxidantes
                  </p>
                </div>
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.hasInsulinResistance}
                  onChange={(e) => updateField("hasInsulinResistance", e.target.checked)}
                  style={styles.checkbox}
                />
                <div>
                  <strong>⚡ Resistencia a la Insulina o Pre-diabetes</strong>
                  <p style={styles.checkboxDesc}>
                    Reduciré carbohidratos y optimizaré tu sensibilidad a la insulina
                  </p>
                </div>
              </label>
            </div>
          )}

          <div style={styles.buttons}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={styles.backButton}
              >
                ← Atrás
              </button>
            )}
            <button type="submit" style={styles.nextButton}>
              {step === 3 ? "✓ Generar Mi Plan" : "Siguiente →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    padding: "20px",
    overflowY: "auto",
  },
  modal: {
    background: "linear-gradient(135deg, #1A1D2E 0%, #14162A 100%)",
    borderRadius: "24px",
    maxWidth: "600px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5)",
  },
  header: {
    padding: "32px 32px 24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    fontWeight: 800,
    margin: "0 0 8px",
    background: "linear-gradient(135deg, #4EEBC2, #E88CED)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as React.CSSProperties,
  subtitle: {
    fontSize: "1rem",
    color: "#94a3b8",
    margin: "0 0 20px",
    lineHeight: 1.5,
  },
  progressBar: {
    height: "6px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #4EEBC2, #E88CED)",
    transition: "width 0.3s ease",
  },
  stepLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
    margin: 0,
    textAlign: "center",
  } as React.CSSProperties,
  form: {
    padding: "32px",
  },
  stepContent: {
    marginBottom: "24px",
  },
  stepTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "24px",
    color: "#f1f5f9",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#cbd5e1",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  radioGroup: {
    display: "flex",
    gap: "16px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    cursor: "pointer",
    flex: 1,
    transition: "all 0.2s ease",
    fontSize: "0.95rem",
    color: "#cbd5e1",
  },
  radio: {
    cursor: "pointer",
  },
  checkboxLabel: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "16px",
    transition: "all 0.2s ease",
    alignItems: "start",
  },
  checkbox: {
    marginTop: "4px",
    cursor: "pointer",
    width: "20px",
    height: "20px",
  },
  checkboxDesc: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    margin: "4px 0 0",
  },
  healthNote: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    marginBottom: "20px",
    lineHeight: 1.5,
  },
  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "32px",
  },
  backButton: {
    flex: 1,
    padding: "14px 24px",
    fontSize: "1rem",
    fontWeight: 600,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#cbd5e1",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  },
  nextButton: {
    flex: 2,
    padding: "14px 24px",
    fontSize: "1rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #4EEBC2, #E88CED)",
    border: "none",
    borderRadius: "12px",
    color: "#0D0F18",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    boxShadow: "0 4px 16px rgba(78, 235, 194, 0.3)",
  },
};
