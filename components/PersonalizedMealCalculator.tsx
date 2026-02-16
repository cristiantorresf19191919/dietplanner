import { NutritionalNeeds, UserProfile } from "@/context/UserProfileContext";

export interface MealDistribution {
  breakfast: { calories: number; protein: number; carbs: number; fats: number };
  snack1: { calories: number; protein: number; carbs: number; fats: number };
  lunch: { calories: number; protein: number; carbs: number; fats: number };
  snack2: { calories: number; protein: number; carbs: number; fats: number };
  dinner: { calories: number; protein: number; carbs: number; fats: number };
}

/**
 * As a nutritionist, I distribute calories and macros throughout the day
 * based on evidence-based meal timing and metabolic optimization
 */
export function calculateMealDistribution(needs: NutritionalNeeds, profile: UserProfile): MealDistribution {
  const { targetCalories, protein, carbs, fats } = needs;

  // Standard distribution for optimal metabolism
  let breakfastPct = 0.25; // 25% - Important for breaking fast and metabolism
  let snack1Pct = 0.10; // 10% - Mid-morning energy
  let lunchPct = 0.35; // 35% - Largest meal for afternoon energy
  let snack2Pct = 0.10; // 10% - Pre-workout/afternoon boost
  let dinnerPct = 0.20; // 20% - Lighter dinner for better sleep

  // Adjust for insulin resistance - more calories earlier in the day
  if (profile.hasInsulinResistance) {
    breakfastPct = 0.30;
    lunchPct = 0.40;
    dinnerPct = 0.15;
    snack2Pct = 0.08;
  }

  // Adjust for muscle gain goal - more calories around training
  if (profile.goal === "gain_muscle") {
    lunchPct = 0.30;
    dinnerPct = 0.25; // Post-workout meal
    snack2Pct = 0.15; // Pre-workout
  }

  const distribution: MealDistribution = {
    breakfast: {
      calories: Math.round(targetCalories * breakfastPct),
      protein: Math.round(protein * breakfastPct),
      carbs: Math.round(carbs * breakfastPct),
      fats: Math.round(fats * breakfastPct),
    },
    snack1: {
      calories: Math.round(targetCalories * snack1Pct),
      protein: Math.round(protein * snack1Pct),
      carbs: Math.round(carbs * snack1Pct),
      fats: Math.round(fats * snack1Pct),
    },
    lunch: {
      calories: Math.round(targetCalories * lunchPct),
      protein: Math.round(protein * lunchPct),
      carbs: Math.round(carbs * lunchPct),
      fats: Math.round(fats * lunchPct),
    },
    snack2: {
      calories: Math.round(targetCalories * snack2Pct),
      protein: Math.round(protein * snack2Pct),
      carbs: Math.round(carbs * snack2Pct),
      fats: Math.round(fats * snack2Pct),
    },
    dinner: {
      calories: Math.round(targetCalories * dinnerPct),
      protein: Math.round(protein * dinnerPct),
      carbs: Math.round(carbs * dinnerPct),
      fats: Math.round(fats * dinnerPct),
    },
  };

  return distribution;
}

/**
 * Food database with nutritional information per 100g
 * This is professionally curated for Colombian/Latin American diet
 */
export const FOOD_DATABASE = {
  // Proteins
  chicken_breast: { name: "Pechuga de pollo", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  salmon: { name: "Salmón", calories: 208, protein: 20, carbs: 0, fats: 13 },
  eggs: { name: "Huevos (2 unidades)", calories: 140, protein: 13, carbs: 1, fats: 10 },
  greek_yogurt: { name: "Yogurt griego", calories: 100, protein: 10, carbs: 4, fats: 5 },
  cottage_cheese: { name: "Queso cottage", calories: 98, protein: 11, carbs: 3, fats: 4 },
  tilapia: { name: "Tilapia", calories: 129, protein: 26, carbs: 0, fats: 3 },
  lean_beef: { name: "Carne magra de res", calories: 250, protein: 26, carbs: 0, fats: 15 },

  // Carbs (Low GI priority)
  sweet_potato: { name: "Batata/Camote", calories: 86, protein: 2, carbs: 20, fats: 0.1 },
  oatmeal: { name: "Avena", calories: 68, protein: 2.4, carbs: 12, fats: 1.4 },
  brown_rice: { name: "Arroz integral", calories: 112, protein: 2.6, carbs: 24, fats: 0.9 },
  quinoa: { name: "Quinoa", calories: 120, protein: 4.4, carbs: 21, fats: 1.9 },
  beans: { name: "Frijoles", calories: 127, protein: 9, carbs: 23, fats: 0.5 },
  lentils: { name: "Lentejas", calories: 116, protein: 9, carbs: 20, fats: 0.4 },

  // Healthy Fats
  avocado: { name: "Aguacate", calories: 160, protein: 2, carbs: 9, fats: 15 },
  olive_oil: { name: "Aceite de oliva", calories: 119, protein: 0, carbs: 0, fats: 13.5 },
  almonds: { name: "Almendras", calories: 579, protein: 21, carbs: 22, fats: 50 },
  walnuts: { name: "Nueces", calories: 654, protein: 15, carbs: 14, fats: 65 },
  chia_seeds: { name: "Semillas de chía", calories: 486, protein: 17, carbs: 42, fats: 31 },

  // Vegetables (unlimited, low cal)
  spinach: { name: "Espinaca", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
  broccoli: { name: "Brócoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4 },
  asparagus: { name: "Espárragos", calories: 20, protein: 2.2, carbs: 4, fats: 0.2 },
  tomato: { name: "Tomate", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2 },
  cucumber: { name: "Pepino", calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1 },
  lettuce: { name: "Lechuga", calories: 15, protein: 1.4, carbs: 2.9, fats: 0.2 },

  // Fruits (moderate)
  berries: { name: "Frutos rojos", calories: 57, protein: 1, carbs: 14, fats: 0.3 },
  apple: { name: "Manzana", calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
  banana: { name: "Plátano", calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
};

export type FoodKey = keyof typeof FOOD_DATABASE;

/**
 * Generate optimized meal plans based on user profile and condition
 */
export function generatePersonalizedMeals(
  mealType: keyof MealDistribution,
  targetMacros: { calories: number; protein: number; carbs: number; fats: number },
  profile: UserProfile
): { foods: Array<{ food: FoodKey; grams: number }>; description: string } {
  const isInsulinResistant = profile.hasInsulinResistance;
  const hasAtherosclerosis = profile.hasAtherosclerosis;

  // Base meal templates
  const meals: Record<keyof MealDistribution, any> = {
    breakfast: isInsulinResistant
      ? {
          foods: [
            { food: "eggs" as FoodKey, grams: Math.round((targetMacros.protein * 0.4 / 13) * 100) },
            { food: "avocado" as FoodKey, grams: Math.round((targetMacros.fats * 0.6 / 15) * 100) },
            { food: "spinach" as FoodKey, grams: 100 },
            { food: "berries" as FoodKey, grams: Math.round((targetMacros.carbs * 0.8 / 14) * 100) },
          ],
          description: "Bajo en carbohidratos, alto en proteína para sensibilidad a insulina",
        }
      : {
          foods: [
            { food: "oatmeal" as FoodKey, grams: Math.round((targetMacros.carbs * 0.6 / 12) * 100) },
            { food: "greek_yogurt" as FoodKey, grams: Math.round((targetMacros.protein * 0.4 / 10) * 100) },
            { food: "berries" as FoodKey, grams: 100 },
            { food: "almonds" as FoodKey, grams: Math.round((targetMacros.fats * 0.5 / 50) * 100) },
          ],
          description: "Desayuno balanceado con carbohidratos complejos",
        },

    snack1: {
      foods: [
        { food: "greek_yogurt" as FoodKey, grams: Math.round((targetMacros.protein * 0.7 / 10) * 100) },
        { food: "almonds" as FoodKey, grams: Math.round((targetMacros.fats * 0.8 / 50) * 100) },
      ],
      description: "Snack proteico con grasas saludables",
    },

    lunch: hasAtherosclerosis
      ? {
          foods: [
            { food: "salmon" as FoodKey, grams: Math.round((targetMacros.protein * 0.5 / 20) * 100) },
            { food: "quinoa" as FoodKey, grams: Math.round((targetMacros.carbs * 0.4 / 21) * 100) },
            { food: "broccoli" as FoodKey, grams: 150 },
            { food: "olive_oil" as FoodKey, grams: Math.round((targetMacros.fats * 0.3 / 13.5) * 100) },
            { food: "spinach" as FoodKey, grams: 100 },
          ],
          description: "Rico en Omega-3 y antioxidantes para salud cardiovascular",
        }
      : {
          foods: [
            { food: "chicken_breast" as FoodKey, grams: Math.round((targetMacros.protein * 0.5 / 31) * 100) },
            { food: "brown_rice" as FoodKey, grams: Math.round((targetMacros.carbs * 0.5 / 24) * 100) },
            { food: "broccoli" as FoodKey, grams: 150 },
            { food: "avocado" as FoodKey, grams: Math.round((targetMacros.fats * 0.4 / 15) * 100) },
          ],
          description: "Almuerzo completo y balanceado",
        },

    snack2: {
      foods: [
        { food: "cottage_cheese" as FoodKey, grams: Math.round((targetMacros.protein * 0.6 / 11) * 100) },
        { food: "cucumber" as FoodKey, grams: 100 },
        { food: "tomato" as FoodKey, grams: 100 },
      ],
      description: "Snack ligero pre-cena",
    },

    dinner: {
      foods: [
        { food: "tilapia" as FoodKey, grams: Math.round((targetMacros.protein * 0.5 / 26) * 100) },
        { food: "sweet_potato" as FoodKey, grams: Math.round((targetMacros.carbs * 0.5 / 20) * 100) },
        { food: "asparagus" as FoodKey, grams: 150 },
        { food: "olive_oil" as FoodKey, grams: Math.round((targetMacros.fats * 0.4 / 13.5) * 100) },
      ],
      description: "Cena ligera para mejor digestión nocturna",
    },
  };

  return meals[mealType];
}
