import { useState } from "react";

const DAYS = [
  {
    name: "Lunes",
    emoji: "🫒",
    theme: "Mediterráneo",
    meals: {
      desayuno: {
        title: "Bowl de avena cardioprotector",
        items: ["Avena integral con arándanos y nueces", "Té verde sin azúcar", "1 cucharada de semillas de linaza molida"],
        benefit: "La avena tiene beta-glucanos que atrapan colesterol en el intestino y lo eliminan antes de que llegue a tu sangre"
      },
      almuerzo: {
        title: "Salmón mediterráneo",
        items: ["Salmón al horno con limón y eneldo", "Ensalada de espinacas, tomate y aguacate", "Arroz integral", "Aceite de oliva extra virgen como aderezo"],
        benefit: "El omega-3 del salmón reduce triglicéridos y es antiinflamatorio — combate directamente la inflamación que inicia la aterosclerosis"
      },
      cena: {
        title: "Crema de lentejas",
        items: ["Sopa de lentejas con cúrcuma y ajo", "Pan integral de centeno", "Ensalada verde con nueces"],
        benefit: "Las lentejas tienen fibra soluble que secuestra ácidos biliares, forzando al hígado a usar colesterol para fabricar más — bajando el LDL"
      },
      snacks: ["Puñado de almendras crudas (30g)", "1 manzana"]
    },
    exercise: {
      type: "Cardio moderado",
      routine: ["Caminata rápida o trote suave — 40 min", "Mantén pulsaciones al 60-70% de tu FC máxima", "FC máxima = 220 - tu edad"],
      why: "El cardio moderado aumenta el HDL (colesterol bueno) que limpia tus arterias"
    }
  },
  {
    name: "Martes",
    emoji: "💪",
    theme: "Fuerza + Fibra",
    meals: {
      desayuno: {
        title: "Tostadas de aguacate",
        items: ["Pan integral con aguacate machacado", "Huevos revueltos (2) con espinaca", "Jugo de naranja natural"],
        benefit: "El aguacate tiene grasas monoinsaturadas que elevan el HDL y bajan el LDL oxidado — el que realmente daña las arterias"
      },
      almuerzo: {
        title: "Pechuga con quinoa",
        items: ["Pechuga de pollo a la plancha", "Quinoa con vegetales salteados (brócoli, zanahoria, cebolla)", "Aceite de oliva", "Ensalada de rúcula y tomate"],
        benefit: "La quinoa es proteína completa con fibra que mantiene estable la glucosa — la hiperglucemia también daña el endotelio arterial"
      },
      cena: {
        title: "Ensalada potente de garbanzos",
        items: ["Garbanzos con pepino, tomate, cebolla morada", "Aderezo de limón y aceite de oliva", "Puñado de semillas de calabaza"],
        benefit: "Los garbanzos bajan el colesterol total gracias a su fibra soluble y sus fitosteroles compiten con el colesterol por absorción"
      },
      snacks: ["Yogur griego natural con semillas de chía", "Zanahoria con hummus"]
    },
    exercise: {
      type: "Fuerza — tren superior",
      routine: ["Flexiones 3x12", "Remo con banda elástica 3x15", "Press de hombros con mancuernas 3x12", "Plancha 3x30 seg", "Estiramientos 10 min"],
      why: "El ejercicio de fuerza mejora la sensibilidad a la insulina y reduce la inflamación sistémica que deteriora las arterias"
    }
  },
  {
    name: "Miércoles",
    emoji: "🐟",
    theme: "Omega-3 Day",
    meals: {
      desayuno: {
        title: "Smoothie antiinflamatorio",
        items: ["Batido de espinaca + banana + jengibre + semillas de linaza", "Puñado de nueces", "Té verde"],
        benefit: "El jengibre es antiinflamatorio natural — reduce las citoquinas que atraen macrófagos a las paredes arteriales"
      },
      almuerzo: {
        title: "Atún con vegetales",
        items: ["Filete de atún sellado", "Batata/camote al horno", "Ensalada de col rizada (kale) con limón", "Aceite de oliva"],
        benefit: "Más omega-3 del atún + la batata tiene antioxidantes (betacaroteno) que previenen la oxidación del LDL"
      },
      cena: {
        title: "Sopa de frijoles negros",
        items: ["Frijoles negros con cilantro y ajo", "Arroz integral", "Aguacate en rodajas"],
        benefit: "Los frijoles negros tienen antocianinas (antioxidantes) que protegen el endotelio y reducen la presión arterial"
      },
      snacks: ["Puñado de nueces de Brasil (3-4)", "Pera"]
    },
    exercise: {
      type: "Cardio HIIT ligero",
      routine: ["Calentamiento 5 min", "30 seg sprint / 90 seg caminata × 8 ciclos", "Enfriamiento 5 min", "Total: ~25 min"],
      why: "El HIIT mejora la función endotelial — hace que las arterias se dilaten mejor y produce óxido nítrico que las protege"
    }
  },
  {
    name: "Jueves",
    emoji: "🥬",
    theme: "Verde total",
    meals: {
      desayuno: {
        title: "Huevos con vegetales",
        items: ["Omelette de claras con espinaca y champiñones", "Pan integral con tomate", "Té de hibisco (jamaica)"],
        benefit: "El té de hibisco reduce la presión arterial — menos presión = menos daño al endotelio = menos puerta de entrada para el LDL"
      },
      almuerzo: {
        title: "Bowl verde de pollo",
        items: ["Pollo desmenuzado sobre cama de espinaca y kale", "Edamame, pepino, aguacate", "Aderezo de tahini y limón", "Semillas de sésamo"],
        benefit: "El kale es rico en vitamina K que regula la calcificación — ayuda a que el calcio vaya a los huesos y NO a las arterias"
      },
      cena: {
        title: "Pasta integral con pesto",
        items: ["Pasta integral con pesto de albahaca y nueces", "Tomates cherry asados", "Ensalada lateral con rúcula"],
        benefit: "Las nueces del pesto aportan L-arginina, precursor del óxido nítrico que mantiene las arterias flexibles y dilatadas"
      },
      snacks: ["Apio con mantequilla de almendra", "Kiwi"]
    },
    exercise: {
      type: "Fuerza — tren inferior",
      routine: ["Sentadillas 3x15", "Zancadas 3x12 cada pierna", "Peso muerto rumano 3x12", "Elevación de gemelos 3x20", "Estiramientos 10 min"],
      why: "Trabajar piernas activa los músculos más grandes del cuerpo, maximizando el consumo de triglicéridos como combustible"
    }
  },
  {
    name: "Viernes",
    emoji: "🫐",
    theme: "Antioxidante",
    meals: {
      desayuno: {
        title: "Bowl de açaí casero",
        items: ["Pulpa de açaí con banana congelada", "Granola sin azúcar", "Arándanos y fresas", "Semillas de chía"],
        benefit: "Los frutos rojos tienen antocianinas que protegen el LDL de la oxidación — si el LDL no se oxida, los macrófagos no lo atacan"
      },
      almuerzo: {
        title: "Sardinas con ensalada",
        items: ["Sardinas en aceite de oliva", "Ensalada grande con tomate, cebolla, pepino", "Pan integral", "Limón como aderezo"],
        benefit: "Las sardinas son una bomba de omega-3 y vitamina D. Además tienen calcio de sus espinas que va a los huesos (no a las arterias)"
      },
      cena: {
        title: "Curry de garbanzos",
        items: ["Garbanzos en salsa de tomate con cúrcuma y comino", "Arroz integral", "Espinaca salteada con ajo"],
        benefit: "La cúrcuma contiene curcumina, un potente antiinflamatorio que reduce la actividad de los macrófagos en las placas"
      },
      snacks: ["Mix de frutos rojos (arándanos, frambuesas)", "Chocolate negro 85%+ (20g)"]
    },
    exercise: {
      type: "Cardio moderado + flexibilidad",
      routine: ["Ciclismo o natación — 35 min", "Yoga o estiramientos profundos — 20 min"],
      why: "La flexibilidad vascular es tan importante como la muscular. El yoga reduce el cortisol, hormona que eleva la presión arterial"
    }
  },
  {
    name: "Sábado",
    emoji: "🏋️",
    theme: "Full Body",
    meals: {
      desayuno: {
        title: "Pancakes de avena y banana",
        items: ["Pancakes de avena + banana + huevo (sin harina refinada)", "Frutos rojos encima", "Café sin azúcar (máx 2 tazas/día)"],
        benefit: "El café en moderación tiene polifenoles antioxidantes que protegen las arterias — sin azúcar para no elevar triglicéridos"
      },
      almuerzo: {
        title: "Tacos de pescado",
        items: ["Tortillas de maíz con tilapia o salmón a la plancha", "Repollo morado rallado", "Guacamole casero", "Salsa de tomate fresco"],
        benefit: "El repollo morado tiene sulforafano que activa las defensas antioxidantes del propio endotelio arterial"
      },
      cena: {
        title: "Ensalada templada de lentejas",
        items: ["Lentejas tibias con cebolla caramelizada", "Espinaca fresca y queso feta (poco)", "Vinagreta de mostaza y limón"],
        benefit: "Las lentejas aportan folato (vitamina B9) que reduce la homocisteína — un aminoácido que en exceso daña las arterias"
      },
      snacks: ["Hummus con bastones de pepino", "Naranja"]
    },
    exercise: {
      type: "Fuerza — cuerpo completo",
      routine: ["Sentadillas con peso 3x12", "Flexiones 3x15", "Remo 3x12", "Plancha lateral 3x20 seg/lado", "Burpees 3x8", "Estiramientos 10 min"],
      why: "El entrenamiento full body libera mioquinas antiinflamatorias desde los músculos que reducen la inflamación arterial"
    }
  },
  {
    name: "Domingo",
    emoji: "🧘",
    theme: "Recuperación activa",
    meals: {
      desayuno: {
        title: "Brunch cardioprotector",
        items: ["Huevos pochados sobre pan integral", "Aguacate y tomate", "Té matcha"],
        benefit: "El matcha tiene catequinas (EGCG) que inhiben la oxidación del LDL y mejoran la función endotelial"
      },
      almuerzo: {
        title: "Pollo al horno con vegetales",
        items: ["Muslo de pollo sin piel al horno con romero", "Vegetales asados (calabacín, berenjena, pimiento)", "Puré de batata"],
        benefit: "El romero tiene ácido carnósico, un antioxidante que protege las grasas de la oxidación dentro del cuerpo"
      },
      cena: {
        title: "Sopa de verduras y legumbres",
        items: ["Sopa casera con zanahoria, apio, cebolla, frijoles blancos", "Pan integral con aceite de oliva", "Infusión de manzanilla"],
        benefit: "Cena ligera para que el cuerpo se enfoque en reparación nocturna. La manzanilla reduce cortisol y mejora el descanso"
      },
      snacks: ["Puñado de pistachos", "Mango"]
    },
    exercise: {
      type: "Recuperación activa",
      routine: ["Caminata en naturaleza — 30 min", "Yoga restaurativo o meditación — 20 min", "Respiración profunda 4-7-8 × 10 ciclos"],
      why: "El descanso activo reduce el cortisol crónico. El estrés sostenido eleva la presión y el colesterol — descansar ES entrenar"
    }
  }
];

const SUPPLEMENTS = [
  { name: "Omega-3 (EPA/DHA)", dose: "2-3g/día", icon: "🐟", why: "Reduce triglicéridos, es antiinflamatorio, estabiliza placas existentes" },
  { name: "Vitamina D3", dose: "2000-4000 UI/día", icon: "☀️", why: "Deficiencia asociada a mayor rigidez arterial y calcificación" },
  { name: "Magnesio glicinato", dose: "300-400mg/día", icon: "⚡", why: "Relaja arterias, reduce presión, previene calcificación arterial" },
  { name: "Vitamina K2 (MK-7)", dose: "100-200mcg/día", icon: "🦴", why: "Dirige el calcio a los huesos y FUERA de las arterias — clave contra calcificación" },
  { name: "Coenzima Q10", dose: "100-200mg/día", icon: "❤️", why: "Antioxidante que protege el LDL de la oxidación y mejora la energía cardíaca" },
  { name: "Curcumina + piperina", dose: "500mg/día", icon: "🟡", why: "Antiinflamatorio potente — reduce la actividad de macrófagos en placas" },
  { name: "Fibra soluble (psyllium)", dose: "5-10g/día", icon: "🌾", why: "Atrapa colesterol en el intestino antes de que llegue a la sangre" },
  { name: "Ajo envejecido", dose: "600-1200mg/día", icon: "🧄", why: "Reduce presión arterial, LDL y la progresión de la calcificación" }
];

const RULES = [
  { rule: "Cero azúcar refinada", icon: "🚫", detail: "El azúcar eleva triglicéridos → más VLDL → más LDL → más aterosclerosis" },
  { rule: "Cero frituras / aceites vegetales refinados", icon: "🍟", detail: "Los aceites de soya, girasol, canola oxidados son proinflamatorios" },
  { rule: "Cero ultraprocesados", icon: "📦", detail: "Tienen grasas trans que elevan LDL y BAJAN HDL — la peor combinación" },
  { rule: "Mínimo 25g fibra/día", icon: "🌿", detail: "La fibra es tu escoba interna que barre colesterol fuera del cuerpo" },
  { rule: "Dormir 7-8 horas", icon: "😴", detail: "Dormir poco eleva cortisol, inflama y aumenta la presión arterial" },
  { rule: "Hidratación: 2-3 litros/día", icon: "💧", detail: "La sangre espesa fluye peor y daña más el endotelio" }
];

export default function AntiAtherosclerosisPlanner() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeTab, setActiveTab] = useState("diet");
  const [expandedSupplement, setExpandedSupplement] = useState(null);

  const day = DAYS[selectedDay];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f0d",
      color: "#e8e4dc",
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      padding: "0",
      overflowX: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0a0f0d 0%, #1a2e1f 50%, #0d1a12 100%)",
        borderBottom: "1px solid rgba(76, 175, 80, 0.15)",
        padding: "28px 20px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(76,175,80,0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{ fontSize: "13px", letterSpacing: "4px", color: "#4CAF50", marginBottom: "8px", textTransform: "uppercase", fontWeight: 600 }}>
          Plan Anti-Aterosclerosis
        </div>
        <h1 style={{
          fontSize: "clamp(22px, 5vw, 32px)",
          fontWeight: 300,
          margin: "0 0 6px",
          letterSpacing: "1px",
          color: "#c8e6c9"
        }}>
          Arterias Limpias, Vida Larga
        </h1>
        <p style={{ fontSize: "13px", color: "#7a9a7e", margin: 0, fontStyle: "italic" }}>
          7 días · Dieta + Ejercicio + Suplementos · Tu escudo contra el colesterol
        </p>
      </div>

      {/* Day Selector */}
      <div style={{
        display: "flex",
        gap: "4px",
        padding: "16px 12px",
        overflowX: "auto",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {DAYS.map((d, i) => (
          <button key={i} onClick={() => setSelectedDay(i)} style={{
            background: selectedDay === i
              ? "linear-gradient(135deg, #2e7d32, #1b5e20)"
              : "rgba(255,255,255,0.04)",
            border: selectedDay === i ? "1px solid #4CAF50" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "10px 14px",
            cursor: "pointer",
            color: selectedDay === i ? "#e8f5e9" : "#7a9a7e",
            fontSize: "13px",
            fontWeight: selectedDay === i ? 600 : 400,
            transition: "all 0.25s ease",
            minWidth: "80px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "18px", marginBottom: "3px" }}>{d.emoji}</div>
            <div>{d.name}</div>
          </button>
        ))}
      </div>

      {/* Day Theme Banner */}
      <div style={{
        margin: "0 16px 12px",
        padding: "12px 18px",
        background: "rgba(76,175,80,0.06)",
        borderRadius: "10px",
        border: "1px solid rgba(76,175,80,0.12)",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <span style={{ fontSize: "24px" }}>{day.emoji}</span>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#a5d6a7" }}>{day.name} — {day.theme}</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{
        display: "flex",
        gap: "6px",
        padding: "0 16px",
        marginBottom: "16px"
      }}>
        {[
          { id: "diet", label: "🍽️ Dieta" },
          { id: "exercise", label: "🏃 Ejercicio" },
          { id: "supplements", label: "💊 Suplementos" },
          { id: "rules", label: "⚠️ Reglas" }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1,
            background: activeTab === tab.id ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.03)",
            border: activeTab === tab.id ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
            padding: "10px 6px",
            cursor: "pointer",
            color: activeTab === tab.id ? "#a5d6a7" : "#5a7a5e",
            fontSize: "12px",
            fontWeight: activeTab === tab.id ? 600 : 400,
            transition: "all 0.2s ease"
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ padding: "0 16px 30px" }}>

        {/* DIET TAB */}
        {activeTab === "diet" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { key: "desayuno", label: "Desayuno", icon: "🌅", time: "7:00 - 8:00 AM" },
              { key: "snacks", label: "Snacks", icon: "🥜", time: "10:30 AM / 4:00 PM" },
              { key: "almuerzo", label: "Almuerzo", icon: "☀️", time: "12:30 - 1:30 PM" },
              { key: "cena", label: "Cena", icon: "🌙", time: "7:00 - 8:00 PM" }
            ].map(meal => {
              if (meal.key === "snacks") {
                return (
                  <div key={meal.key} style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "14px",
                    padding: "16px",
                    border: "1px solid rgba(255,255,255,0.06)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "20px" }}>{meal.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "15px", color: "#c8e6c9" }}>{meal.label}</div>
                        <div style={{ fontSize: "11px", color: "#5a7a5e" }}>{meal.time}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {day.meals.snacks.map((s, i) => (
                        <div key={i} style={{
                          fontSize: "13px",
                          color: "#b0bfa8",
                          padding: "6px 10px",
                          background: "rgba(76,175,80,0.05)",
                          borderRadius: "8px",
                          borderLeft: "2px solid rgba(76,175,80,0.3)"
                        }}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              const mealData = day.meals[meal.key];
              return (
                <div key={meal.key} style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "14px",
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "20px" }}>{meal.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "15px", color: "#c8e6c9" }}>{meal.label}</div>
                      <div style={{ fontSize: "11px", color: "#5a7a5e" }}>{meal.time}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#a5d6a7", marginBottom: "10px" }}>
                    {mealData.title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "12px" }}>
                    {mealData.items.map((item, i) => (
                      <div key={i} style={{
                        fontSize: "13px",
                        color: "#b0bfa8",
                        padding: "5px 10px",
                        background: "rgba(76,175,80,0.04)",
                        borderRadius: "8px",
                        borderLeft: "2px solid rgba(76,175,80,0.2)"
                      }}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div style={{
                    background: "rgba(76,175,80,0.08)",
                    borderRadius: "10px",
                    padding: "10px 12px",
                    border: "1px solid rgba(76,175,80,0.15)"
                  }}>
                    <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#4CAF50", marginBottom: "4px", fontWeight: 600 }}>
                      ¿Por qué esto protege tus arterias?
                    </div>
                    <div style={{ fontSize: "12px", color: "#8fbe8f", lineHeight: 1.5, fontStyle: "italic" }}>
                      {mealData.benefit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EXERCISE TAB */}
        {activeTab === "exercise" && (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.06)"
          }}>
            <div style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#4CAF50",
              marginBottom: "6px",
              fontWeight: 600
            }}>
              {day.name}
            </div>
            <h3 style={{ fontSize: "20px", color: "#c8e6c9", margin: "0 0 18px", fontWeight: 500 }}>
              {day.exercise.type}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {day.exercise.routine.map((step, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "10px 12px",
                  background: "rgba(76,175,80,0.05)",
                  borderRadius: "10px"
                }}>
                  <div style={{
                    minWidth: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "rgba(76,175,80,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#a5d6a7"
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: "14px", color: "#b0bfa8", paddingTop: "3px" }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(76,175,80,0.08)",
              borderRadius: "12px",
              padding: "14px",
              border: "1px solid rgba(76,175,80,0.15)"
            }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#4CAF50", marginBottom: "6px", fontWeight: 600 }}>
                ¿Por qué este ejercicio protege tus arterias?
              </div>
              <div style={{ fontSize: "13px", color: "#8fbe8f", lineHeight: 1.6, fontStyle: "italic" }}>
                {day.exercise.why}
              </div>
            </div>

            {/* Weekly overview mini */}
            <div style={{ marginTop: "20px" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", color: "#5a7a5e", marginBottom: "10px" }}>
                Vista semanal
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {DAYS.map((d, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    background: i === selectedDay ? "rgba(76,175,80,0.1)" : "transparent",
                    fontSize: "12px"
                  }}>
                    <span style={{ color: "#5a7a5e", minWidth: "65px" }}>{d.name}</span>
                    <span style={{ color: i === selectedDay ? "#a5d6a7" : "#7a9a7e" }}>{d.exercise.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUPPLEMENTS TAB */}
        {activeTab === "supplements" && (
          <div>
            <div style={{
              background: "rgba(255,152,0,0.08)",
              border: "1px solid rgba(255,152,0,0.2)",
              borderRadius: "12px",
              padding: "12px 14px",
              marginBottom: "14px",
              fontSize: "12px",
              color: "#ffcc80",
              lineHeight: 1.5
            }}>
              ⚠️ Consulta con tu médico antes de tomar suplementos, especialmente si tomas medicación. Esto no reemplaza tratamiento médico.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {SUPPLEMENTS.map((sup, i) => (
                <div
                  key={i}
                  onClick={() => setExpandedSupplement(expandedSupplement === i ? null : i)}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                    padding: "14px",
                    border: expandedSupplement === i ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "22px" }}>{sup.icon}</span>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#c8e6c9" }}>{sup.name}</div>
                        <div style={{ fontSize: "12px", color: "#4CAF50", fontWeight: 500 }}>{sup.dose}</div>
                      </div>
                    </div>
                    <span style={{ color: "#5a7a5e", fontSize: "18px", transition: "transform 0.2s", transform: expandedSupplement === i ? "rotate(180deg)" : "rotate(0)" }}>
                      ▾
                    </span>
                  </div>
                  {expandedSupplement === i && (
                    <div style={{
                      marginTop: "10px",
                      padding: "10px 12px",
                      background: "rgba(76,175,80,0.06)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#8fbe8f",
                      lineHeight: 1.5
                    }}>
                      <strong style={{ color: "#a5d6a7" }}>Conexión con la aterosclerosis:</strong> {sup.why}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RULES TAB */}
        {activeTab === "rules" && (
          <div>
            <div style={{
              textAlign: "center",
              padding: "16px",
              marginBottom: "14px"
            }}>
              <div style={{ fontSize: "14px", color: "#a5d6a7", fontWeight: 500 }}>
                Reglas no negociables
              </div>
              <div style={{ fontSize: "12px", color: "#5a7a5e", marginTop: "4px" }}>
                Sin esto, la dieta y los suplementos no servirán de nada
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {RULES.map((r, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "22px" }}>{r.icon}</span>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#c8e6c9" }}>{r.rule}</div>
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#8fbe8f",
                    lineHeight: 1.5,
                    paddingLeft: "36px",
                    fontStyle: "italic"
                  }}>
                    {r.detail}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "20px",
              background: "linear-gradient(135deg, rgba(76,175,80,0.1), rgba(46,125,50,0.05))",
              borderRadius: "14px",
              padding: "18px",
              border: "1px solid rgba(76,175,80,0.15)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>🛡️</div>
              <div style={{ fontSize: "13px", color: "#a5d6a7", fontWeight: 500, marginBottom: "6px" }}>
                Recuerda el flow de la aterosclerosis
              </div>
              <div style={{ fontSize: "12px", color: "#7a9a7e", lineHeight: 1.6 }}>
                Daño endotelial → LDL se infiltra → Se oxida → Macrófagos lo comen → Células espumosas → Mueren → Placa → Calcificación → Ruptura → Trombo → Infarto
              </div>
              <div style={{ fontSize: "12px", color: "#4CAF50", marginTop: "10px", fontWeight: 600 }}>
                Este plan ataca CADA paso de esa cadena.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}