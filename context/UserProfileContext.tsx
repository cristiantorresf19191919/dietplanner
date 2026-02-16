"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: "male" | "female";
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  goal: "lose_weight" | "maintain" | "gain_muscle";
  hasAtherosclerosis: boolean;
  hasInsulinResistance: boolean;
}

export interface NutritionalNeeds {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  fiber: number; // grams
  omega3: number; // grams
  recommendations: string[];
}

interface UserProfileContextType {
  profile: UserProfile | null;
  nutritionalNeeds: NutritionalNeeds | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  hasProfile: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// Calculate BMR using Mifflin-St Jeor Equation
function calculateBMR(weight: number, height: number, age: number, gender: "male" | "female"): number {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Calculate nutritional needs based on profile
function calculateNutritionalNeeds(profile: UserProfile): NutritionalNeeds {
  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel];

  let targetCalories = tdee;
  let proteinMultiplier = 1.6; // g per kg body weight
  let carbPercentage = 0.40;
  let fatPercentage = 0.30;

  const recommendations: string[] = [];

  // Adjust based on goal
  switch (profile.goal) {
    case "lose_weight":
      targetCalories = tdee - 500; // 500 cal deficit
      proteinMultiplier = 2.0; // Higher protein to preserve muscle
      carbPercentage = 0.35;
      fatPercentage = 0.30;
      recommendations.push("Objetivo: Déficit calórico moderado para pérdida de grasa sostenible");
      recommendations.push("Proteína alta para preservar masa muscular");
      break;
    case "maintain":
      targetCalories = tdee;
      proteinMultiplier = 1.6;
      carbPercentage = 0.40;
      fatPercentage = 0.30;
      recommendations.push("Objetivo: Mantenimiento de peso y composición corporal");
      break;
    case "gain_muscle":
      targetCalories = tdee + 300; // 300 cal surplus
      proteinMultiplier = 2.2;
      carbPercentage = 0.45;
      fatPercentage = 0.25;
      recommendations.push("Objetivo: Superávit calórico para ganancia muscular");
      recommendations.push("Carbohidratos elevados para energía y recuperación");
      break;
  }

  // Adjust for atherosclerosis
  if (profile.hasAtherosclerosis) {
    fatPercentage = 0.25; // Lower fat, prioritize omega-3
    carbPercentage = 0.40;
    recommendations.push("⚠️ Aterosclerosis: Reducción de grasas saturadas");
    recommendations.push("Priorizar grasas omega-3, aceite de oliva y aguacate");
    recommendations.push("Aumentar antioxidantes: frutos rojos, té verde, cacao");
    recommendations.push("Limitar azúcares refinados y harinas procesadas");
  }

  // Adjust for insulin resistance
  if (profile.hasInsulinResistance) {
    carbPercentage = 0.30; // Lower carbs
    proteinMultiplier = Math.max(proteinMultiplier, 1.8);
    fatPercentage = 0.35; // Higher healthy fats
    recommendations.push("⚠️ Resistencia a Insulina: Carbohidratos reducidos");
    recommendations.push("Priorizar proteínas y grasas saludables");
    recommendations.push("Carbohidratos de bajo índice glucémico únicamente");
    recommendations.push("Implementar ayuno intermitente (16:8)");
    recommendations.push("Ejercicio de fuerza 3-4 veces por semana");
  }

  // Calculate macros
  const protein = profile.weight * proteinMultiplier;
  const proteinCalories = protein * 4;

  const remainingCalories = targetCalories - proteinCalories;
  const carbCalories = remainingCalories * (carbPercentage / (carbPercentage + fatPercentage));
  const fatCalories = remainingCalories * (fatPercentage / (carbPercentage + fatPercentage));

  const carbs = carbCalories / 4;
  const fats = fatCalories / 9;

  // Fiber recommendation: 14g per 1000 calories
  const fiber = Math.round((targetCalories / 1000) * 14);

  // Omega-3 recommendation
  const omega3 = profile.hasAtherosclerosis ? 2.5 : 1.5; // grams per day

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats),
    fiber,
    omega3,
    recommendations,
  };
}

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [nutritionalNeeds, setNutritionalNeeds] = useState<NutritionalNeeds | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfileState(parsed);
        setNutritionalNeeds(calculateNutritionalNeeds(parsed));
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
  }, []);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    const needs = calculateNutritionalNeeds(newProfile);
    setNutritionalNeeds(needs);
    localStorage.setItem("userProfile", JSON.stringify(newProfile));
  };

  const clearProfile = () => {
    setProfileState(null);
    setNutritionalNeeds(null);
    localStorage.removeItem("userProfile");
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        nutritionalNeeds,
        setProfile,
        clearProfile,
        hasProfile: profile !== null,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
