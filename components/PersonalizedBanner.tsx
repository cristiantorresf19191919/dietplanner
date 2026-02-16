"use client";

import { useUserProfile } from "@/context/UserProfileContext";
import { calculateMealDistribution, FOOD_DATABASE, generatePersonalizedMeals, FoodKey } from "./PersonalizedMealCalculator";

export default function PersonalizedBanner() {
  const { profile, nutritionalNeeds } = useUserProfile();

  if (!profile || !nutritionalNeeds) return null;

  const mealDist = calculateMealDistribution(nutritionalNeeds, profile);

  return (
    <div style={styles.banner}>
      <div style={styles.bannerContent}>
        <div style={styles.bannerHeader}>
          <h2 style={styles.bannerTitle}>
            <span style={styles.icon}>👤</span> Tu Plan Nutricional Personalizado
          </h2>
          <p style={styles.bannerSubtitle}>
            Calculado científicamente basado en tu perfil: {profile.age} años, {profile.weight}kg, {profile.height}cm
          </p>
        </div>

        {/* Daily Targets */}
        <div style={styles.targetsGrid}>
          <div style={styles.targetCard}>
            <div style={styles.targetIcon}>🔥</div>
            <div style={styles.targetValue}>{nutritionalNeeds.targetCalories}</div>
            <div style={styles.targetLabel}>Calorías/día</div>
            <div style={styles.targetNote}>
              {profile.goal === "lose_weight" && "Déficit de 500 cal"}
              {profile.goal === "maintain" && "Mantenimiento"}
              {profile.goal === "gain_muscle" && "Superávit de 300 cal"}
            </div>
          </div>

          <div style={styles.targetCard}>
            <div style={styles.targetIcon}>💪</div>
            <div style={styles.targetValue}>{nutritionalNeeds.protein}g</div>
            <div style={styles.targetLabel}>Proteína</div>
            <div style={styles.targetNote}>{(nutritionalNeeds.protein / profile.weight).toFixed(1)}g/kg peso</div>
          </div>

          <div style={styles.targetCard}>
            <div style={styles.targetIcon}>🍞</div>
            <div style={styles.targetValue}>{nutritionalNeeds.carbs}g</div>
            <div style={styles.targetLabel}>Carbohidratos</div>
            <div style={styles.targetNote}>{profile.hasInsulinResistance && "Reducidos (bajo IG)"}</div>
          </div>

          <div style={styles.targetCard}>
            <div style={styles.targetIcon}>🥑</div>
            <div style={styles.targetValue}>{nutritionalNeeds.fats}g</div>
            <div style={styles.targetLabel}>Grasas</div>
            <div style={styles.targetNote}>Priorizar omega-3</div>
          </div>

          <div style={styles.targetCard}>
            <div style={styles.targetIcon}>🌾</div>
            <div style={styles.targetValue}>{nutritionalNeeds.fiber}g</div>
            <div style={styles.targetLabel}>Fibra</div>
            <div style={styles.targetNote}>14g/1000 cal</div>
          </div>

          <div style={styles.targetCard}>
            <div style={styles.targetIcon}>🐟</div>
            <div style={styles.targetValue}>{nutritionalNeeds.omega3}g</div>
            <div style={styles.targetLabel}>Omega-3</div>
            <div style={styles.targetNote}>EPA + DHA</div>
          </div>
        </div>

        {/* Recommendations */}
        {nutritionalNeeds.recommendations.length > 0 && (
          <div style={styles.recommendations}>
            <h3 style={styles.recommendationsTitle}>📋 Recomendaciones Personalizadas</h3>
            <ul style={styles.recommendationsList}>
              {nutritionalNeeds.recommendations.map((rec, idx) => (
                <li key={idx} style={styles.recommendationItem}>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Meal Distribution */}
        <div style={styles.mealDistSection}>
          <h3 style={styles.mealDistTitle}>⏰ Distribución de Comidas Recomendada</h3>
          <div style={styles.mealDistGrid}>
            {Object.entries(mealDist).map(([mealName, macros]) => {
              const mealNames: Record<string, string> = {
                breakfast: "Desayuno",
                snack1: "Snack AM",
                lunch: "Almuerzo",
                snack2: "Snack PM",
                dinner: "Cena",
              };

              return (
                <div key={mealName} style={styles.mealDistCard}>
                  <div style={styles.mealDistName}>{mealNames[mealName]}</div>
                  <div style={styles.mealDistMacros}>
                    <div><strong>{macros.calories}</strong> cal</div>
                    <div>{macros.protein}g P</div>
                    <div>{macros.carbs}g C</div>
                    <div>{macros.fats}g G</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sample Meal Plan */}
        <div style={styles.sampleMealsSection}>
          <h3 style={styles.sampleMealsTitle}>🍽️ Ejemplo de Comidas Personalizadas</h3>
          <div style={styles.sampleMealsGrid}>
            {(["breakfast", "lunch", "dinner"] as const).map((mealType) => {
              const meal = generatePersonalizedMeals(mealType, mealDist[mealType], profile);
              const mealNames: Record<string, string> = {
                breakfast: "Desayuno",
                lunch: "Almuerzo",
                dinner: "Cena",
              };

              return (
                <div key={mealType} style={styles.sampleMealCard}>
                  <h4 style={styles.sampleMealName}>{mealNames[mealType]}</h4>
                  <p style={styles.sampleMealDesc}>{meal.description}</p>
                  <ul style={styles.sampleMealItems}>
                    {meal.foods.map((item, idx) => {
                      const foodInfo = FOOD_DATABASE[item.food];
                      return (
                        <li key={idx} style={styles.sampleMealItem}>
                          <strong>{item.grams}g</strong> {foodInfo.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  banner: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    padding: "40px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  bannerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  bannerHeader: {
    textAlign: "center",
    marginBottom: "40px",
  } as React.CSSProperties,
  bannerTitle: {
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    fontWeight: 800,
    margin: "0 0 12px",
    background: "linear-gradient(135deg, #4EEBC2, #E88CED)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as React.CSSProperties,
  icon: {
    marginRight: "12px",
  },
  bannerSubtitle: {
    fontSize: "1.1rem",
    color: "#94a3b8",
    margin: 0,
  },
  targetsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  } as React.CSSProperties,
  targetCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "center",
  } as React.CSSProperties,
  targetIcon: {
    fontSize: "2.5rem",
    marginBottom: "12px",
  },
  targetValue: {
    fontSize: "2rem",
    fontWeight: 900,
    background: "linear-gradient(135deg, #4EEBC2, #E88CED)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "8px",
  } as React.CSSProperties,
  targetLabel: {
    fontSize: "0.9rem",
    color: "#cbd5e1",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 600,
    marginBottom: "4px",
  } as React.CSSProperties,
  targetNote: {
    fontSize: "0.75rem",
    color: "#64748b",
    fontStyle: "italic",
  },
  recommendations: {
    background: "linear-gradient(135deg, rgba(78, 235, 194, 0.1), rgba(232, 140, 237, 0.1))",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(78, 235, 194, 0.2)",
    marginBottom: "40px",
  },
  recommendationsTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#f1f5f9",
    marginBottom: "16px",
    margin: "0 0 16px",
  },
  recommendationsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  recommendationItem: {
    fontSize: "1rem",
    color: "#cbd5e1",
    marginBottom: "12px",
    paddingLeft: "24px",
    position: "relative",
    lineHeight: 1.6,
  } as React.CSSProperties,
  mealDistSection: {
    marginBottom: "40px",
  },
  mealDistTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#f1f5f9",
    marginBottom: "20px",
    margin: "0 0 20px",
  },
  mealDistGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "16px",
  } as React.CSSProperties,
  mealDistCard: {
    background: "rgba(255, 255, 255, 0.03)",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  mealDistName: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#4EEBC2",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  } as React.CSSProperties,
  mealDistMacros: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "0.85rem",
    color: "#cbd5e1",
  } as React.CSSProperties,
  sampleMealsSection: {
    marginTop: "40px",
  },
  sampleMealsTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#f1f5f9",
    marginBottom: "20px",
    margin: "0 0 20px",
  },
  sampleMealsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  } as React.CSSProperties,
  sampleMealCard: {
    background: "linear-gradient(135deg, rgba(78, 235, 194, 0.05), rgba(232, 140, 237, 0.05))",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  sampleMealName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#4EEBC2",
    marginBottom: "8px",
    margin: "0 0 8px",
  },
  sampleMealDesc: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    marginBottom: "16px",
    fontStyle: "italic",
    margin: "0 0 16px",
  },
  sampleMealItems: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sampleMealItem: {
    fontSize: "0.95rem",
    color: "#cbd5e1",
    marginBottom: "8px",
    paddingLeft: "20px",
    position: "relative",
  } as React.CSSProperties,
};
