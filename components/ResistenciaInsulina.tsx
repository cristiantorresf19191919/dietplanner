"use client";

import React, { useState, useEffect } from "react";
import DietProgressTracker from "./DietProgressTracker";

export default function ResistenciaInsulina() {
  const [activeSection, setActiveSection] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".content-section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        if (
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      id: "intro",
      title: "El Proceso Normal",
      subtitle: "Cuando todo funciona bien",
      icon: "⚡",
    },
    {
      id: "exceso",
      title: "El Exceso Constante",
      subtitle: "Cuando comes demasiado",
      icon: "📈",
    },
    {
      id: "saturacion",
      title: "Células Saturadas",
      subtitle: "Resistencia a la insulina",
      icon: "🚫",
    },
    {
      id: "grasa",
      title: "Glucosa → Grasa",
      subtitle: "El hígado la convierte",
      icon: "🏭",
    },
    {
      id: "cancer",
      title: "Insulina y Cáncer",
      subtitle: "El efecto anabólico",
      icon: "☠️",
    },
    {
      id: "cerebro",
      title: "Deterioro Cerebral",
      subtitle: "Diabetes tipo 3",
      icon: "🧠",
    },
    {
      id: "energia",
      title: "Colapso Energético",
      subtitle: "Gordo y cansado",
      icon: "🔋",
    },
    {
      id: "diabetes",
      title: "Diabetes Tipo 2",
      subtitle: "El páncreas se agota",
      icon: "💔",
    },
    {
      id: "dieta",
      title: "Plan de Alimentación",
      subtitle: "Semana completa",
      icon: "🥗",
    },
    {
      id: "ejercicio",
      title: "Rutina de Ejercicio",
      subtitle: "7 días de entrenamiento",
      icon: "💪",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroAnimation}>
            <div style={styles.glucoseParticle}></div>
            <div style={styles.glucoseParticle} className="delay-1"></div>
            <div style={styles.glucoseParticle} className="delay-2"></div>
            <div style={styles.insulinWave}></div>
          </div>
          <h1 style={styles.heroTitle}>
            <span style={styles.gradientText}>Resistencia a la Insulina</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Cómo el exceso de glucosa destruye tu cuerpo y qué hacer para
            revertirlo
          </p>
          <div className="hero-stats" style={styles.heroStats}>
            <div className="stat-card" style={styles.statCard}>
              <div style={styles.statNumber}>90%</div>
              <div style={styles.statLabel}>De las diabetes son tipo 2</div>
            </div>
            <div className="stat-card" style={styles.statCard}>
              <div style={styles.statNumber}>100%</div>
              <div style={styles.statLabel}>Reversible con dieta y ejercicio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Pills */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                ...styles.navPill,
                ...(activeSection === index ? styles.navPillActive : {}),
              }}
            >
              <span style={styles.navIcon}>{section.icon}</span>
              <span style={styles.navText}>{section.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Section 1: Proceso Normal */}
      <section id="intro" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>⚡</span>
            <h2 style={styles.sectionTitle}>El Proceso Normal</h2>
            <p style={styles.sectionSubtitle}>
              Cuando todo funciona como debería
            </p>
          </div>

          <div className="process-normal" style={styles.processNormal}>
            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>Comes Carbohidratos</h3>
              <p style={styles.stepText}>
                Se descomponen en <strong>glucosa</strong>
              </p>
              <div style={styles.stepIcon}>🍞</div>
            </div>
            <div style={styles.arrow}>→</div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>Glucosa en Sangre</h3>
              <p style={styles.stepText}>Entra al torrente sanguíneo</p>
              <div style={styles.stepIcon}>🩸</div>
            </div>
            <div style={styles.arrow}>→</div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Páncreas → Insulina</h3>
              <p style={styles.stepText}>
                Libera la <strong>llave</strong> para abrir células
              </p>
              <div style={styles.stepIcon}>🔑</div>
            </div>
            <div style={styles.arrow}>→</div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>4</div>
              <h3 style={styles.stepTitle}>Glucosa → Energía</h3>
              <p style={styles.stepText}>Las células la usan como combustible</p>
              <div style={styles.stepIcon}>⚡</div>
            </div>
          </div>

          <div style={styles.successBox}>
            <h3 style={styles.successTitle}>✅ Sistema Perfecto</h3>
            <p style={styles.paragraph}>
              Cuando funciona bien, la glucosa se mantiene estable, las células
              reciben energía, y el páncreas descansa entre comidas.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Exceso Constante */}
      <section id="exceso" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>📈</span>
            <h2 style={styles.sectionTitle}>
              Paso 1: El Exceso Constante de Glucosa
            </h2>
          </div>

          <div style={styles.dangerBox}>
            <h3 style={styles.dangerTitle}>🚨 El Problema</h3>
            <p style={styles.paragraph}>
              Cuando comes demasiados carbohidratos refinados, azúcares y
              comida procesada <strong>constantemente</strong>, tu sangre se
              inunda de glucosa una y otra vez.
            </p>
          </div>

          <div className="two-column" style={styles.twoColumn}>
            <div style={styles.imageColumn}>
              <div className="bad-food-grid" style={styles.badFoodGrid}>
                <div style={styles.badFoodCard}>
                  <div style={styles.badFoodIcon}>🍞</div>
                  <div style={styles.badFoodLabel}>Pan blanco</div>
                </div>
                <div style={styles.badFoodCard}>
                  <div style={styles.badFoodIcon}>🍕</div>
                  <div style={styles.badFoodLabel}>Pizza</div>
                </div>
                <div style={styles.badFoodCard}>
                  <div style={styles.badFoodIcon}>🍬</div>
                  <div style={styles.badFoodLabel}>Azúcar refinada</div>
                </div>
                <div style={styles.badFoodCard}>
                  <div style={styles.badFoodIcon}>🥤</div>
                  <div style={styles.badFoodLabel}>Refrescos</div>
                </div>
                <div style={styles.badFoodCard}>
                  <div style={styles.badFoodIcon}>🍰</div>
                  <div style={styles.badFoodLabel}>Pasteles</div>
                </div>
                <div style={styles.badFoodCard}>
                  <div style={styles.badFoodIcon}>🍟</div>
                  <div style={styles.badFoodLabel}>Procesados</div>
                </div>
              </div>
            </div>

            <div style={styles.textColumn}>
              <h3 style={styles.subtitle}>La Respuesta del Páncreas</h3>
              <p style={styles.paragraph}>
                El páncreas responde bombeando cada vez{" "}
                <strong>más insulina</strong> para intentar meter toda esa
                glucosa en las células.
              </p>

              <div style={styles.animationBox}>
                <div style={styles.pancreasAnimation}>
                  <div style={styles.pancreas}>🫘</div>
                  <div style={styles.insulinBurst}>
                    <span>💉</span>
                    <span>💉</span>
                    <span>💉</span>
                    <span>💉</span>
                    <span>💉</span>
                  </div>
                </div>
                <p style={styles.animationLabel}>
                  Páncreas trabajando en exceso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Saturación */}
      <section
        id="saturacion"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🚫</span>
            <h2 style={styles.sectionTitle}>Paso 2: Las Células Se Saturan</h2>
          </div>

          <div style={styles.comparisonBox}>
            <h3 style={styles.comparisonTitle}>La Analogía del Grito</h3>
            <p style={styles.paragraph}>
              Las células musculares, hepáticas y adiposas reciben tanta
              glucosa e insulina constantemente que empiezan a{" "}
              <strong>"ignorar"</strong> la señal.
            </p>
            <div style={styles.analogyBox}>
              <p style={styles.analogyText}>
                Es como si alguien te gritara todo el día:{" "}
                <strong>eventualmente dejas de escuchar.</strong>
              </p>
            </div>
          </div>

          <div className="resistance-flow" style={styles.resistanceFlow}>
            <div style={styles.resistanceCard}>
              <h4 style={styles.resistanceTitle}>Antes</h4>
              <div style={styles.cellNormal}>
                <div style={styles.cellIcon}>🔓</div>
                <p style={styles.cellLabel}>Célula receptiva</p>
                <div style={styles.receptors}>
                  <span>🔑</span>
                  <span>🔑</span>
                  <span>🔑</span>
                </div>
              </div>
            </div>

            <div style={styles.transformArrow}>→</div>

            <div style={styles.resistanceCard}>
              <h4 style={styles.resistanceTitle}>Después</h4>
              <div style={styles.cellResistant}>
                <div style={styles.cellIcon}>🔒</div>
                <p style={styles.cellLabel}>Célula resistente</p>
                <div style={styles.receptors}>
                  <span style={{ opacity: 0.3 }}>🔑</span>
                  <span style={{ opacity: 0.3 }}>🔑</span>
                  <span style={{ opacity: 0.3 }}>🔑</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.warningBox}>
            <h3 style={styles.warningTitle}>⚠️ Resistencia a la Insulina</h3>
            <p style={styles.paragraph}>
              Los receptores de insulina en las células se vuelven menos
              sensibles. El páncreas detecta que la glucosa no está bajando,
              así que produce <strong>aún más insulina</strong>.
            </p>
            <div style={styles.criticalBox}>
              <p style={styles.criticalText}>
                Ahora tienes <strong>glucosa alta</strong> E{" "}
                <strong>insulina alta</strong> en sangre al mismo tiempo.
              </p>
              <p style={styles.criticalText}>
                <strong>Aquí empieza el desastre.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Glucosa → Grasa */}
      <section id="grasa" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🏭</span>
            <h2 style={styles.sectionTitle}>
              Paso 3: La Glucosa Se Convierte en Grasa
            </h2>
          </div>

          <div style={styles.factoryBox}>
            <h3 style={styles.factoryTitle}>La Fábrica del Hígado</h3>
            <p style={styles.paragraph}>
              La glucosa que las células rechazan tiene que ir a algún lado. El
              hígado la recoge y la convierte en{" "}
              <strong>triglicéridos (grasa)</strong>.
            </p>

            <div className="conversion-flow" style={styles.conversionFlow}>
              <div style={styles.conversionStep}>
                <div style={styles.conversionIcon}>🍬</div>
                <p>Glucosa rechazada</p>
              </div>
              <div style={styles.arrow}>→</div>
              <div style={styles.conversionStep}>
                <div style={styles.conversionIcon}>🏭</div>
                <p>Hígado la procesa</p>
              </div>
              <div style={styles.arrow}>→</div>
              <div style={styles.conversionStep}>
                <div style={styles.conversionIcon}>🧈</div>
                <p>Triglicéridos (grasa)</p>
              </div>
              <div style={styles.arrow}>→</div>
              <div style={styles.conversionStep}>
                <div style={styles.conversionIcon}>📦</div>
                <p>Empaquetada en VLDL</p>
              </div>
            </div>
          </div>

          <div className="fat-types-grid" style={styles.fatTypesGrid}>
            <div style={styles.fatTypeCard}>
              <div
                style={{
                  ...styles.fatTypeHeader,
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                }}
              >
                <h4 style={styles.fatTypeName}>Grasa Visceral</h4>
                <div style={styles.dangerBadge}>MÁS PELIGROSA</div>
              </div>
              <div style={styles.fatTypeContent}>
                <p style={styles.paragraph}>
                  Se acumula alrededor de los órganos (hígado, intestinos,
                  páncreas).
                </p>
                <ul style={styles.fatTypeList}>
                  <li>Metabólicamente activa</li>
                  <li>Libera sustancias inflamatorias constantemente</li>
                  <li>Aumenta riesgo cardiovascular</li>
                </ul>
              </div>
            </div>

            <div style={styles.fatTypeCard}>
              <div
                style={{
                  ...styles.fatTypeHeader,
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                }}
              >
                <h4 style={styles.fatTypeName}>Hígado Graso</h4>
                <div style={styles.warningBadge}>PELIGROSA</div>
              </div>
              <div style={styles.fatTypeContent}>
                <p style={styles.paragraph}>
                  El hígado se llena de grasa que él mismo fabricó.
                </p>
                <ul style={styles.fatTypeList}>
                  <li>Pierde eficiencia</li>
                  <li>Se inflama</li>
                  <li>Puede derivar en cirrosis (sin alcohol)</li>
                </ul>
              </div>
            </div>

            <div style={styles.fatTypeCard}>
              <div
                style={{
                  ...styles.fatTypeHeader,
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                }}
              >
                <h4 style={styles.fatTypeName}>Grasa Subcutánea</h4>
                <div style={styles.infoBadge}>MENOS PELIGROSA</div>
              </div>
              <div style={styles.fatTypeContent}>
                <p style={styles.paragraph}>
                  La que se ve por fuera: barriga, brazos, piernas.
                </p>
                <ul style={styles.fatTypeList}>
                  <li>Es la menos peligrosa de las tres</li>
                  <li>Contribuye al sobrepeso</li>
                  <li>Indicador visual del problema</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Cáncer */}
      <section id="cancer" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>☠️</span>
            <h2 style={styles.sectionTitle}>
              Paso 4: La Insulina Alta Promueve el Cáncer
            </h2>
          </div>

          <div style={styles.cancerIntro}>
            <h3 style={styles.subtitle}>El Efecto Anabólico</h3>
            <p style={styles.paragraph}>
              La insulina no solo mete glucosa en las células, también es una{" "}
              <strong>hormona de crecimiento</strong>. Cuando hay exceso de
              insulina crónico pasan tres cosas peligrosas:
            </p>
          </div>

          <div className="cancer-mechanisms" style={styles.cancerMechanisms}>
            <div style={styles.mechanismCard}>
              <div style={styles.mechanismNumber}>1</div>
              <h4 style={styles.mechanismTitle}>Efecto Directo</h4>
              <p style={styles.mechanismText}>
                La insulina estimula la <strong>proliferación celular</strong>.
                Le dice a las células "crece, divídete".
              </p>
              <div style={styles.mechanismDanger}>
                <p>
                  Si hay una célula con mutaciones precancerosas, la insulina
                  le está <strong>echando gasolina al fuego</strong>. Esa
                  célula anormal crece más rápido de lo que debería.
                </p>
              </div>
            </div>

            <div style={styles.mechanismCard}>
              <div style={styles.mechanismNumber}>2</div>
              <h4 style={styles.mechanismTitle}>IGF-1 (Factor de Crecimiento)</h4>
              <p style={styles.mechanismText}>
                La insulina alta estimula la producción de{" "}
                <strong>IGF-1</strong> en el hígado.
              </p>
              <div style={styles.igfEffects}>
                <div style={styles.igfEffect}>
                  <span style={styles.igfIcon}>📈</span>
                  <p>Más potente que insulina como promotor de crecimiento</p>
                </div>
                <div style={styles.igfEffect}>
                  <span style={styles.igfIcon}>🛡️</span>
                  <p>
                    <strong>Inhibe la apoptosis</strong> (muerte celular
                    programada)
                  </p>
                </div>
              </div>
              <div style={styles.mechanismDanger}>
                <p>
                  Tu cuerpo normalmente detecta células dañadas y las elimina.
                  El IGF-1 <strong>bloquea ese mecanismo de seguridad</strong>.
                  Las células cancerosas que deberían morir sobreviven y siguen
                  multiplicándose.
                </p>
              </div>
            </div>

            <div style={styles.mechanismCard}>
              <div style={styles.mechanismNumber}>3</div>
              <h4 style={styles.mechanismTitle}>
                Glucosa como Alimento del Tumor
              </h4>
              <p style={styles.mechanismText}>
                Las células cancerosas tienen un metabolismo alterado llamado{" "}
                <strong>Efecto Warburg</strong>.
              </p>
              <div style={styles.warburgBox}>
                <p style={styles.warburgText}>
                  Consumen glucosa a una velocidad{" "}
                  <strong>muchísimo mayor</strong> que las células normales.
                </p>
                <p style={styles.warburgText}>
                  Un ambiente con glucosa alta constante es un{" "}
                  <strong>buffet libre para los tumores</strong>.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.comboBox}>
            <h3 style={styles.comboTitle}>💀 El Combo Devastador</h3>
            <div style={styles.comboItems}>
              <div style={styles.comboItem}>
                <span style={styles.comboIcon}>📈</span>
                <p>
                  La <strong>insulina</strong> les dice "crece"
                </p>
              </div>
              <div style={styles.comboItem}>
                <span style={styles.comboIcon}>🛡️</span>
                <p>
                  El <strong>IGF-1</strong> les dice "no mueras"
                </p>
              </div>
              <div style={styles.comboItem}>
                <span style={styles.comboIcon}>🍬</span>
                <p>
                  La <strong>glucosa alta</strong> les dice "aquí tienes toda
                  la comida"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Cerebro */}
      <section id="cerebro" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🧠</span>
            <h2 style={styles.sectionTitle}>Paso 5: El Cerebro Se Deteriora</h2>
          </div>

          <div style={styles.brainIntro}>
            <h3 style={styles.subtitle}>La Paradoja del Cerebro</h3>
            <p style={styles.paragraph}>
              El cerebro depende principalmente de glucosa, pero
              paradójicamente el exceso lo destruye.
            </p>
          </div>

          <div style={styles.brainProblems}>
            <div style={styles.brainProblem}>
              <div style={styles.brainProblemHeader}>
                <span style={styles.brainIcon}>🔒</span>
                <h4 style={styles.brainProblemTitle}>
                  Resistencia a la Insulina Cerebral
                </h4>
              </div>
              <p style={styles.paragraph}>
                Sí, el cerebro también se vuelve resistente a la insulina. Las
                neuronas no pueden captar glucosa eficientemente a pesar de que
                hay de sobra en la sangre.
              </p>
              <div style={styles.alzheimersBox}>
                <p style={styles.alzheimersText}>
                  <strong>Tienen combustible afuera pero no pueden usarlo.</strong>
                </p>
                <p style={styles.alzheimersText}>
                  Por eso al Alzheimer le dicen{" "}
                  <strong>"Diabetes Tipo 3"</strong>: las neuronas mueren de
                  hambre en un mar de glucosa.
                </p>
              </div>
            </div>

            <div style={styles.brainProblem}>
              <div style={styles.brainProblemHeader}>
                <span style={styles.brainIcon}>🔥</span>
                <h4 style={styles.brainProblemTitle}>Inflamación Crónica</h4>
              </div>
              <p style={styles.paragraph}>
                El exceso de glucosa genera <strong>AGEs</strong> (productos de
                glicación avanzada): moléculas de glucosa que se pegan a
                proteínas y las dañan.
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  Causa inflamación crónica en el cerebro
                </li>
                <li style={styles.listItem}>Deteriora las sinapsis</li>
                <li style={styles.listItem}>Destruye la memoria</li>
              </ul>
            </div>

            <div style={styles.brainProblem}>
              <div style={styles.brainProblemHeader}>
                <span style={styles.brainIcon}>🩸</span>
                <h4 style={styles.brainProblemTitle}>Daño Vascular</h4>
              </div>
              <p style={styles.paragraph}>
                La glucosa alta daña los vasos sanguíneos pequeños que
                alimentan al cerebro (igual que en la aterosclerosis).
              </p>
              <div style={styles.equationBox}>
                <p style={styles.equation}>
                  Menos flujo sanguíneo = Menos oxígeno = Neuronas mueren
                </p>
              </div>
            </div>

            <div style={styles.brainProblem}>
              <div style={styles.brainProblemHeader}>
                <span style={styles.brainIcon}>🌫️</span>
                <h4 style={styles.brainProblemTitle}>Niebla Mental y Fatiga</h4>
              </div>
              <p style={styles.paragraph}>
                Los picos y caídas de glucosa causan ciclos de energía-crash:
              </p>
              <div style={styles.cycleBox}>
                <div style={styles.cycleStep}>
                  <span>1️⃣</span>
                  <p>Comes azúcar</p>
                </div>
                <div style={styles.arrow}>→</div>
                <div style={styles.cycleStep}>
                  <span>2️⃣</span>
                  <p>Sube glucosa</p>
                </div>
                <div style={styles.arrow}>→</div>
                <div style={styles.cycleStep}>
                  <span>3️⃣</span>
                  <p>Te sientes bien</p>
                </div>
                <div style={styles.arrow}>→</div>
                <div style={styles.cycleStep}>
                  <span>4️⃣</span>
                  <p>Insulina la baja</p>
                </div>
                <div style={styles.arrow}>→</div>
                <div style={styles.cycleStep}>
                  <span>5️⃣</span>
                  <p>Cansado, sin concentración</p>
                </div>
                <div style={styles.arrow}>→</div>
                <div style={styles.cycleStep}>
                  <span>6️⃣</span>
                  <p>Comes más azúcar</p>
                </div>
              </div>
              <p style={styles.viciosoText}>
                <strong>Ciclo vicioso interminable</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Energía */}
      <section id="energia" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🔋</span>
            <h2 style={styles.sectionTitle}>
              Paso 6: La Energía Se Colapsa
            </h2>
          </div>

          <div style={styles.energyParadox}>
            <h3 style={styles.paradoxTitle}>La Paradoja del Gordo Cansado</h3>
            <p style={styles.paragraph}>
              Aunque tengas grasa almacenada de sobra, con insulina alta tu
              cuerpo <strong>no puede acceder a ella</strong>.
            </p>

            <div style={styles.insulinLock}>
              <div style={styles.fatStorage}>
                <div style={styles.fatIcon}>🏦</div>
                <p style={styles.fatLabel}>
                  Miles de calorías almacenadas
                </p>
              </div>
              <div style={styles.lockIcon}>🔒</div>
              <div style={styles.insulinLabel}>
                <p>
                  <strong>Insulina Alta:</strong>
                </p>
                <p>"¡Guarda grasa, NO la quemes!"</p>
              </div>
            </div>

            <div style={styles.resultBox}>
              <p style={styles.resultText}>
                Tienes miles de calorías almacenadas pero{" "}
                <strong>no puedes usarlas</strong>.
              </p>
              <div style={styles.resultSymptoms}>
                <div style={styles.symptom}>
                  <span>😴</span>
                  <p>Gordo y cansado</p>
                </div>
                <div style={styles.symptom}>
                  <span>😫</span>
                  <p>Tu cuerpo pide más comida</p>
                </div>
                <div style={styles.symptom}>
                  <span>🍔</span>
                  <p>Comes más</p>
                </div>
                <div style={styles.symptom}>
                  <span>💉</span>
                  <p>Produces más insulina</p>
                </div>
                <div style={styles.symptom}>
                  <span>🔄</span>
                  <p>El ciclo se repite</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Diabetes */}
      <section id="diabetes" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>💔</span>
            <h2 style={styles.sectionTitle}>Paso 7: Diabetes Tipo 2</h2>
          </div>

          <div style={styles.diabetesBox}>
            <h3 style={styles.diabetesTitle}>El Agotamiento del Páncreas</h3>
            <p style={styles.paragraph}>
              Eventualmente el páncreas se agota. Lleva años produciendo
              insulina en exceso y las <strong>células beta</strong> (las que
              fabrican insulina) empiezan a morir.
            </p>

            <div style={styles.pancreasTimeline}>
              <div style={styles.timelineStage}>
                <div style={styles.stageIcon}>💪</div>
                <h4 style={styles.stageName}>Páncreas Normal</h4>
                <p style={styles.stageDesc}>Produce insulina según necesidad</p>
              </div>
              <div style={styles.arrow}>→</div>

              <div style={styles.timelineStage}>
                <div style={styles.stageIcon}>😰</div>
                <h4 style={styles.stageName}>Sobrecarga</h4>
                <p style={styles.stageDesc}>
                  Trabaja 24/7 produciendo más y más
                </p>
              </div>
              <div style={styles.arrow}>→</div>

              <div style={styles.timelineStage}>
                <div style={styles.stageIcon}>😵</div>
                <h4 style={styles.stageName}>Agotamiento</h4>
                <p style={styles.stageDesc}>Células beta empiezan a morir</p>
              </div>
              <div style={styles.arrow}>→</div>

              <div style={styles.timelineStage}>
                <div
                  style={{
                    ...styles.stageIcon,
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  }}
                >
                  💀
                </div>
                <h4 style={styles.stageName}>Diabetes Tipo 2</h4>
                <p style={styles.stageDesc}>Ya no produce suficiente insulina</p>
              </div>
            </div>

            <div style={styles.diabetesConsequences}>
              <h4 style={styles.consequencesTitle}>
                🚨 Las Complicaciones se Aceleran:
              </h4>
              <div style={styles.consequencesList}>
                <div style={styles.consequence}>
                  <span>🫘</span>
                  <p>Daño renal</p>
                </div>
                <div style={styles.consequence}>
                  <span>👁️</span>
                  <p>Ceguera</p>
                </div>
                <div style={styles.consequence}>
                  <span>🦶</span>
                  <p>Neuropatía</p>
                </div>
                <div style={styles.consequence}>
                  <span>✂️</span>
                  <p>Amputaciones</p>
                </div>
                <div style={styles.consequence}>
                  <span>💔</span>
                  <p>Enfermedad cardiovascular</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div style={styles.videoSection}>
            <h3 style={styles.videoSectionTitle}>
              📺 Video Explicativo: Resistencia a la Insulina
            </h3>
            <div
              style={styles.videoCard}
              onClick={() => setShowVideo(true)}
            >
              <div style={styles.videoThumbnail}>
                <div style={styles.playButton}>▶</div>
                <div style={styles.videoTitle}>
                  Cómo funciona la resistencia a la insulina
                </div>
              </div>
            </div>
          </div>

          {showVideo && (
            <div
              style={styles.videoModal}
              onClick={() => setShowVideo(false)}
            >
              <div
                style={styles.videoModalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  style={styles.closeButton}
                  onClick={() => setShowVideo(false)}
                >
                  ✕
                </button>
                <video
                  controls
                  autoPlay
                  style={styles.video}
                  src="/resistencia-insulina/resistencia_insulina.mp4"
                >
                  Tu navegador no soporta el tag de video.
                </video>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 9: Dieta */}
      <section id="dieta" className="content-section" style={styles.section}>
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🥗</span>
            <h2 style={styles.sectionTitle}>Plan de Alimentación Semanal</h2>
            <p style={styles.sectionSubtitle}>
              Para prevenir y revertir la resistencia a la insulina
            </p>
          </div>

          <div style={styles.principlesBox}>
            <h3 style={styles.principlesTitle}>🎯 Principios Generales</h3>
            <div style={styles.principlesGrid}>
              <div style={styles.principleCard}>
                <span style={styles.principleIcon}>🍗</span>
                <p>Proteína en cada comida</p>
              </div>
              <div style={styles.principleCard}>
                <span style={styles.principleIcon}>🌾</span>
                <p>Carbohidratos complejos de bajo IG</p>
              </div>
              <div style={styles.principleCard}>
                <span style={styles.principleIcon}>🥑</span>
                <p>Grasas saludables</p>
              </div>
              <div style={styles.principleCard}>
                <span style={styles.principleIcon}>🚫</span>
                <p>Evitar azúcar y ultraprocesados</p>
              </div>
              <div style={styles.principleCard}>
                <span style={styles.principleIcon}>⏰</span>
                <p>12 horas de ayuno nocturno mínimo</p>
              </div>
            </div>
          </div>

          <div style={styles.weekPlan}>
            {[
              {
                day: "Lunes",
                breakfast:
                  "Huevos revueltos (2-3) con espinacas y medio aguacate, café sin azúcar",
                lunch:
                  "Pechuga de pollo a la plancha con ensalada grande (lechuga, tomate, pepino, aceite de oliva, limón) y media taza de arroz integral",
                dinner: "Salmón al horno con brócoli salteado en aceite de oliva y ajo",
                snack: "Puñado de nueces o almendras",
                color: "#10b981",
              },
              {
                day: "Martes",
                breakfast:
                  "Avena integral cocida con canela, nueces y arándanos (sin azúcar)",
                lunch:
                  "Lentejas guisadas con verduras (zanahoria, apio, cebolla) y ensalada verde",
                dinner:
                  "Carne magra de res a la plancha con espárragos y camote/batata asado (porción pequeña)",
                snack: "Yogur natural sin azúcar con semillas de chía",
                color: "#3b82f6",
              },
              {
                day: "Miércoles",
                breakfast:
                  "Tortilla de huevos con champiñones, tomate y queso fresco, aguacate",
                lunch:
                  "Atún en lata (en agua) con ensalada de garbanzos, pepino, tomate, cebolla morada, aceite de oliva",
                dinner: "Pechuga de pavo con calabacín salteado y quinoa",
                snack: "Zanahoria y apio con hummus",
                color: "#8b5cf6",
              },
              {
                day: "Jueves",
                breakfast: "Huevos cocidos (2-3) con aguacate y tomate en rodajas",
                lunch:
                  "Pollo desmenuzado con frijoles negros, pico de gallo y lechuga (sin tortilla o con una sola integral)",
                dinner: "Merluza o tilapia al horno con coliflor rostizada y ensalada",
                snack: "Puñado de almendras con una manzana verde pequeña",
                color: "#f59e0b",
              },
              {
                day: "Viernes",
                breakfast:
                  "Batido de espinaca, proteína (whey o huevo), media banana, mantequilla de maní sin azúcar, leche de almendra",
                lunch:
                  "Ensalada grande con salmón, aguacate, semillas de girasol, aceite de oliva, hojas verdes mixtas",
                dinner:
                  "Pollo al horno con papas al horno (porción moderada) y ensalada de tomate y cebolla",
                snack: "Yogur natural con nueces",
                color: "#ec4899",
              },
              {
                day: "Sábado",
                breakfast: "Huevos revueltos con pimientos, cebolla y frijoles",
                lunch:
                  "Carne molida magra con vegetales salteados (pimientos, brócoli, cebolla) sobre arroz integral",
                dinner:
                  "Sardinas o caballa con ensalada mediterránea (pepino, tomate, aceitunas, queso feta, aceite de oliva)",
                snack: "Guacamole con palitos de pepino",
                color: "#06b6d4",
              },
              {
                day: "Domingo",
                breakfast:
                  "Pancakes de avena y banana (avena, huevo, banana, canela — sin harina blanca ni azúcar)",
                lunch:
                  "Sopa de pollo con verduras abundantes (zanahoria, apio, espinaca, papa) con pan integral",
                dinner: "Lomo de cerdo al horno con camote y ensalada verde",
                snack: "Frutos secos mixtos",
                color: "#eab308",
              },
            ].map((day, index) => (
              <div
                key={index}
                style={{
                  ...styles.dayPlanCard,
                  borderLeft: `4px solid ${day.color}`,
                }}
              >
                <div style={styles.dayPlanHeader}>
                  <h4 style={styles.dayPlanName}>{day.day}</h4>
                </div>
                <div style={styles.dayPlanMeals}>
                  <div style={styles.mealRow}>
                    <span style={styles.mealIcon}>🌅</span>
                    <div style={styles.mealContent}>
                      <strong>Desayuno:</strong> {day.breakfast}
                    </div>
                  </div>
                  <div style={styles.mealRow}>
                    <span style={styles.mealIcon}>☀️</span>
                    <div style={styles.mealContent}>
                      <strong>Almuerzo:</strong> {day.lunch}
                    </div>
                  </div>
                  <div style={styles.mealRow}>
                    <span style={styles.mealIcon}>🌙</span>
                    <div style={styles.mealContent}>
                      <strong>Cena:</strong> {day.dinner}
                    </div>
                  </div>
                  <div style={styles.mealRow}>
                    <span style={styles.mealIcon}>🍎</span>
                    <div style={styles.mealContent}>
                      <strong>Snack:</strong> {day.snack}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Tracker */}
          <DietProgressTracker dietType="insulina" />
        </div>
      </section>

      {/* Section 10: Ejercicio */}
      <section
        id="ejercicio"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>💪</span>
            <h2 style={styles.sectionTitle}>Plan de Ejercicio Semanal</h2>
            <p style={styles.sectionSubtitle}>
              7 días para aumentar la sensibilidad a la insulina
            </p>
          </div>

          <div style={styles.exerciseWhy}>
            <h3 style={styles.exerciseWhyTitle}>
              ¿Por qué esta combinación funciona?
            </h3>
            <div style={styles.exerciseReasons}>
              <div style={styles.reasonCard}>
                <span style={styles.reasonIcon}>🏋️</span>
                <h4 style={styles.reasonTitle}>La Fuerza</h4>
                <p style={styles.reasonText}>
                  Construye músculo, y el músculo es el mayor "devorador" de
                  glucosa del cuerpo. <strong>Más músculo = más lugares donde
                  meter glucosa</strong> sin necesitar tanta insulina.
                </p>
              </div>
              <div style={styles.reasonCard}>
                <span style={styles.reasonIcon}>🏃</span>
                <h4 style={styles.reasonTitle}>Cardio Zona 2</h4>
                <p style={styles.reasonText}>
                  Quema grasa como combustible principal y mejora la capacidad
                  de las mitocondrias para procesar energía.
                </p>
              </div>
              <div style={styles.reasonCard}>
                <span style={styles.reasonIcon}>⚡</span>
                <h4 style={styles.reasonTitle}>HIIT</h4>
                <p style={styles.reasonText}>
                  Vacía los depósitos de glucógeno y crea una "ventana" donde
                  las células absorben glucosa <strong>sin necesitar
                  insulina</strong> (GLUT4).
                </p>
              </div>
            </div>
          </div>

          <div style={styles.exercisePlan}>
            {[
              {
                day: "Lunes",
                type: "Fuerza Tren Superior",
                icon: "💪",
                exercises: [
                  "Press de banca o flexiones",
                  "Remo con mancuerna o barra",
                  "Press de hombros",
                  "Curl de bíceps",
                  "Fondos de tríceps",
                ],
                sets: "3-4 series de 8-12 repeticiones",
                benefit:
                  "El ejercicio de fuerza aumenta la sensibilidad a la insulina porque el músculo es el principal consumidor de glucosa",
                color: "#ef4444",
              },
              {
                day: "Martes",
                type: "Cardio Moderado (Zona 2)",
                icon: "🏃",
                exercises: [
                  "Caminar rápido",
                  "Trotar suave",
                  "Bicicleta",
                  "Nadar",
                ],
                sets: "30-45 minutos",
                benefit:
                  "Este tipo de cardio quema grasa directamente y mejora la salud cardiovascular sin estresar el cuerpo. Clave: poder mantener una conversación",
                color: "#f59e0b",
              },
              {
                day: "Miércoles",
                type: "Fuerza Tren Inferior",
                icon: "🦵",
                exercises: [
                  "Sentadillas",
                  "Peso muerto",
                  "Prensa de piernas",
                  "Zancadas",
                  "Extensión de cuádriceps",
                  "Curl de isquiotibiales",
                ],
                sets: "3-4 series de 8-12 repeticiones",
                benefit:
                  "Las piernas son los músculos más grandes, entrenarlas absorbe enormes cantidades de glucosa",
                color: "#8b5cf6",
              },
              {
                day: "Jueves",
                type: "Caminata Larga / Descanso Activo",
                icon: "🚶",
                exercises: ["Caminar 45-60 minutos a paso cómodo"],
                sets: "Ritmo constante y cómodo",
                benefit:
                  "Baja la glucosa postprandial suavemente. Si estás cansado, solo estira y haz movilidad articular",
                color: "#10b981",
              },
              {
                day: "Viernes",
                type: "Fuerza Cuerpo Completo",
                icon: "🏋️‍♂️",
                exercises: [
                  "Sentadilla",
                  "Press",
                  "Remo",
                  "Peso muerto rumano",
                  "Planchas",
                ],
                sets: "3 series de 10 repeticiones cada uno",
                benefit:
                  "Los ejercicios compuestos reclutan más masa muscular y tienen mayor impacto en la sensibilidad a la insulina",
                color: "#3b82f6",
              },
              {
                day: "Sábado",
                type: "HIIT o Deporte",
                icon: "⚡",
                exercises: [
                  "20-25 min de intervalos de alta intensidad",
                  "Sprints de 30 seg con 90 seg de descanso",
                  "O jugar un deporte (fútbol, baloncesto, tenis)",
                ],
                sets: "Intervalos de alta intensidad",
                benefit:
                  "El HIIT vacía los depósitos de glucógeno muscular rápidamente, lo que obliga a las células a aceptar más glucosa después",
                color: "#ec4899",
              },
              {
                day: "Domingo",
                type: "Descanso o Movilidad",
                icon: "🧘",
                exercises: [
                  "Descanso total",
                  "Estiramientos",
                  "Yoga suave",
                  "Caminata tranquila",
                ],
                sets: "Recuperación activa",
                benefit:
                  "La recuperación es cuando el cuerpo se adapta y repara. Esencial para el progreso",
                color: "#06b6d4",
              },
            ].map((workout, index) => (
              <div
                key={index}
                style={{
                  ...styles.workoutCard,
                  borderLeft: `4px solid ${workout.color}`,
                }}
              >
                <div style={styles.workoutHeader}>
                  <div style={styles.workoutDay}>
                    <span style={styles.workoutIcon}>{workout.icon}</span>
                    <h4 style={styles.workoutDayName}>{workout.day}</h4>
                  </div>
                  <div
                    style={{
                      ...styles.workoutType,
                      background: `${workout.color}22`,
                      color: workout.color,
                    }}
                  >
                    {workout.type}
                  </div>
                </div>
                <div style={styles.workoutExercises}>
                  <h5 style={styles.exercisesTitle}>Ejercicios:</h5>
                  <ul style={styles.exerciseList}>
                    {workout.exercises.map((exercise, i) => (
                      <li key={i} style={styles.exerciseItem}>
                        {exercise}
                      </li>
                    ))}
                  </ul>
                  <div style={styles.workoutSets}>
                    <strong>Sets:</strong> {workout.sets}
                  </div>
                </div>
                <div style={styles.workoutBenefit}>
                  <strong>💡 Beneficio:</strong> {workout.benefit}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.finalMessageBox}>
            <h3 style={styles.finalMessageTitle}>
              🎯 Atacando el Problema desde Dos Frentes
            </h3>
            <div style={styles.finalMessageGrid}>
              <div style={styles.finalMessageCard}>
                <span style={styles.finalMessageIcon}>🥗</span>
                <h4 style={styles.finalMessageCardTitle}>La Dieta</h4>
                <p style={styles.finalMessageText}>
                  Reduce la glucosa que entra
                </p>
              </div>
              <div style={styles.plusSign}>+</div>
              <div style={styles.finalMessageCard}>
                <span style={styles.finalMessageIcon}>💪</span>
                <h4 style={styles.finalMessageCardTitle}>El Ejercicio</h4>
                <p style={styles.finalMessageText}>
                  Aumenta la glucosa que se consume
                </p>
              </div>
              <div style={styles.equalsSign}>=</div>
              <div style={styles.finalMessageCard}>
                <span style={styles.finalMessageIcon}>✅</span>
                <h4 style={styles.finalMessageCardTitle}>Resultado</h4>
                <p style={styles.finalMessageText}>
                  Sensibilidad a la insulina restaurada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            💡 <strong>Recuerda:</strong> La resistencia a la insulina es
            reversible. Con dieta y ejercicio puedes recuperar tu salud.
          </p>
          <p style={styles.footerSubtext}>
            Este protocolo está diseñado para estabilizar la glucosa, mantener
            la insulina baja, y restaurar la sensibilidad celular
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes burst {
          0% {
            transform: scale(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: scale(1.5) translateY(-30px);
            opacity: 0;
          }
        }

        .delay-1 {
          animation-delay: 0.5s;
        }

        .delay-2 {
          animation-delay: 1s;
        }

        @media (max-width: 1024px) {
          nav > div {
            padding: 0 16px !important;
          }

          section {
            padding: 80px 20px !important;
          }
        }

        @media (max-width: 768px) {
          /* Container adjustments */
          body {
            overflow-x: hidden;
          }

          /* Navigation */
          nav {
            padding: 12px 0 !important;
          }

          nav > div {
            padding: 0 12px !important;
            gap: 8px !important;
          }

          nav button {
            padding: 8px 16px !important;
            font-size: 0.85rem !important;
          }

          nav button span:first-child {
            font-size: 1.1rem !important;
          }

          .nav-text {
            display: none !important;
          }

          /* Hero section */
          section:first-of-type {
            min-height: 90vh !important;
            padding: 60px 16px !important;
          }

          section:first-of-type > div {
            padding: 0 16px !important;
          }

          .hero-stats {
            gap: 20px !important;
            flex-direction: column !important;
            width: 100%;
          }

          .hero-stats > div {
            width: 100% !important;
            max-width: 400px !important;
            margin: 0 auto !important;
          }

          /* Two column layouts */
          .two-column {
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
          }

          /* Process flows - make scrollable */
          .process-normal,
          .resistance-flow,
          .conversion-flow {
            display: flex !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: thin !important;
            padding: 20px 10px !important;
            margin: 0 -16px !important;
            scroll-snap-type: x mandatory !important;
          }

          .process-normal > *,
          .resistance-flow > *,
          .conversion-flow > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          .process-normal::-webkit-scrollbar,
          .resistance-flow::-webkit-scrollbar,
          .conversion-flow::-webkit-scrollbar {
            height: 6px !important;
          }

          .process-normal::-webkit-scrollbar-thumb,
          .resistance-flow::-webkit-scrollbar-thumb,
          .conversion-flow::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2) !important;
            border-radius: 3px !important;
          }

          /* All grids become single column */
          .bad-food-grid,
          .fat-types-grid,
          .cancer-mechanisms,
          .brain-grid,
          .diet-grid,
          .exercise-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }

          /* Section padding */
          section {
            padding: 60px 16px !important;
          }

          section > div {
            width: 100% !important;
          }

          /* Content boxes */
          div[style*="background: linear-gradient(135deg, rgba(239, 68, 68"],
          div[style*="background: linear-gradient(135deg, rgba(251, 191, 36"],
          div[style*="background: linear-gradient(135deg, rgba(59, 130, 246"],
          div[style*="background: linear-gradient(135deg, rgba(16, 185, 129"],
          div[style*="background: rgba(59, 130, 246"],
          div[style*="background: rgba(255, 255, 255, 0.05)"] {
            padding: 24px !important;
            margin: 20px 0 !important;
          }

          /* Table-like grids */
          div[style*="display: grid"][style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 15px !important;
          }

          /* Font sizes */
          h1 {
            font-size: clamp(2.5rem, 10vw, 4rem) !important;
          }

          h2 {
            font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
          }

          h3 {
            font-size: clamp(1.4rem, 5vw, 1.8rem) !important;
          }

          h4 {
            font-size: clamp(1.1rem, 4vw, 1.3rem) !important;
          }

          p {
            font-size: clamp(0.95rem, 3.5vw, 1.1rem) !important;
            line-height: 1.7 !important;
          }

          /* Stat cards */
          .stat-card {
            padding: 20px 30px !important;
          }

          /* Images */
          img {
            max-width: 100% !important;
            height: auto !important;
          }

          /* Video elements */
          video {
            max-width: 100% !important;
            height: auto !important;
          }
        }

        @media (max-width: 480px) {
          /* Hero section smaller */
          section:first-of-type {
            min-height: 85vh !important;
            padding: 40px 12px !important;
          }

          section:first-of-type > div {
            padding: 0 12px !important;
          }

          /* Hero animation */
          section:first-of-type > div > div:first-child {
            width: 120px !important;
            height: 120px !important;
            margin-bottom: 20px !important;
          }

          /* Hero title */
          h1 {
            font-size: clamp(2rem, 12vw, 3rem) !important;
            margin-bottom: 16px !important;
          }

          /* Hero subtitle */
          section:first-of-type p {
            font-size: clamp(0.9rem, 4vw, 1.1rem) !important;
            margin-bottom: 40px !important;
          }

          /* Stats */
          .hero-stats {
            gap: 12px !important;
          }

          .hero-stats > div {
            padding: 16px 24px !important;
          }

          .hero-stats > div > div:first-child {
            font-size: 2.5rem !important;
          }

          .hero-stats > div > div:last-child {
            font-size: 0.8rem !important;
          }

          /* Navigation */
          nav {
            padding: 10px 0 !important;
          }

          nav > div {
            padding: 0 8px !important;
            gap: 6px !important;
          }

          nav button {
            padding: 6px 12px !important;
            font-size: 0.8rem !important;
          }

          nav button span:first-child {
            font-size: 1rem !important;
          }

          /* Sections */
          section {
            padding: 40px 12px !important;
          }

          /* Section headers */
          section > div > div:first-child {
            margin-bottom: 30px !important;
          }

          section > div > div:first-child > span {
            font-size: 2.5rem !important;
          }

          /* All content boxes */
          div[style*="padding: 30px"],
          div[style*="padding: 40px"],
          div[style*="padding: 25px"] {
            padding: 16px !important;
          }

          /* Process flow/step cards */
          .process-normal > div,
          .resistance-flow > div,
          .conversion-flow > div {
            min-width: 240px !important;
            padding: 16px !important;
          }

          .process-normal > div > div:first-child,
          .conversion-flow > div > div:first-child {
            width: 36px !important;
            height: 36px !important;
            font-size: 1.1rem !important;
          }

          .process-normal > span,
          .conversion-flow > span,
          .resistance-flow > div {
            font-size: 1.5rem !important;
          }

          /* Bad food grid items */
          .bad-food-grid > div {
            padding: 12px !important;
          }

          /* Fat type cards */
          .fat-types-grid > div {
            margin-bottom: 16px;
          }

          /* Mechanism cards */
          .cancer-mechanisms > div {
            padding: 16px !important;
          }

          .cancer-mechanisms > div > div:first-child {
            width: 36px !important;
            height: 36px !important;
            font-size: 1.1rem !important;
          }

          /* Diet and exercise cards */
          div[style*="min-width: 280px"] {
            min-width: 100% !important;
            padding: 16px !important;
          }

          /* Cell animations */
          div[style*="width: 100px"] {
            width: 80px !important;
          }

          div[style*="height: 100px"] {
            height: 80px !important;
          }

          /* Pancreas animation */
          div[style*="fontSize: 3rem"] {
            font-size: 2.5rem !important;
          }

          /* Footer */
          footer {
            padding: 32px 12px !important;
          }

          footer p:first-child {
            font-size: 1rem !important;
          }

          footer p:last-child {
            font-size: 0.9rem !important;
          }

          /* Arrows between steps */
          div[style*="fontSize: 2rem"] {
            font-size: 1.5rem !important;
            margin: 0 8px;
          }

          /* Icon sizes in steps */
          div[style*="fontSize: 4rem"] {
            font-size: 3rem !important;
          }

          /* Analogies and info boxes */
          div[style*="padding: 20px"][style*="border-radius"] {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#f1f5f9",
    fontFamily: "'Outfit', sans-serif",
  },

  // Hero
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    textAlign: "center",
    zIndex: 2,
    maxWidth: "900px",
    padding: "0 20px",
  } as React.CSSProperties,
  heroAnimation: {
    position: "relative",
    width: "200px",
    height: "200px",
    margin: "0 auto 40px",
  } as React.CSSProperties,
  glucoseParticle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "3px solid #3b82f6",
    transform: "translate(-50%, -50%)",
    animation: "pulse 2s ease-out infinite",
  } as React.CSSProperties,
  insulinWave: {
    position: "absolute",
    top: "50%",
    left: "0",
    width: "200%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #10b981, transparent)",
    animation: "wave 3s linear infinite",
  } as React.CSSProperties,
  heroTitle: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: 900,
    margin: "0 0 20px",
    letterSpacing: "-2px",
  },
  gradientText: {
    background: "linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #06b6d4 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as React.CSSProperties,
  heroSubtitle: {
    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
    color: "#cbd5e1",
    maxWidth: "700px",
    margin: "0 auto 60px",
    lineHeight: 1.6,
  },
  heroStats: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    flexWrap: "wrap",
  } as React.CSSProperties,
  statCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    padding: "30px 50px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  statNumber: {
    fontSize: "3rem",
    fontWeight: 900,
    background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "10px",
  } as React.CSSProperties,
  statLabel: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "1px",
  } as React.CSSProperties,

  // Navigation
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(15, 23, 42, 0.9)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "15px 0",
  } as React.CSSProperties,
  navContent: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    padding: "0 20px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  navPill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "30px",
    color: "#cbd5e1",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    fontSize: "0.9rem",
    fontWeight: 500,
  } as React.CSSProperties,
  navPillActive: {
    background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
    border: "1px solid transparent",
    color: "#fff",
    transform: "translateY(-2px)",
  } as React.CSSProperties,
  navIcon: {
    fontSize: "1.2rem",
  },
  navText: {
    fontFamily: "'Outfit', sans-serif",
  } as React.CSSProperties,

  // Sections
  section: {
    padding: "100px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  sectionContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  } as React.CSSProperties,
  sectionIcon: {
    fontSize: "4rem",
    display: "block",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    margin: "0 0 10px",
    background: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as React.CSSProperties,
  sectionSubtitle: {
    fontSize: "1.2rem",
    color: "#94a3b8",
    margin: 0,
  },

  // Process Normal
  processNormal: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "60px",
    overflowX: "auto",
    padding: "40px 20px",
  } as React.CSSProperties,
  stepCard: {
    background: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    borderRadius: "20px",
    padding: "30px",
    minWidth: "200px",
    textAlign: "center",
  } as React.CSSProperties,
  stepNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    fontSize: "1.2rem",
    fontWeight: 900,
  } as React.CSSProperties,
  stepTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#f1f5f9",
  },
  stepText: {
    fontSize: "0.95rem",
    color: "#cbd5e1",
    marginBottom: "20px",
  },
  stepIcon: {
    fontSize: "3rem",
  },
  arrow: {
    fontSize: "2rem",
    color: "#64748b",
  },
  successBox: {
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
    border: "2px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "20px",
    padding: "40px",
  } as React.CSSProperties,
  successTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "20px",
    color: "#6ee7b7",
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#cbd5e1",
    marginBottom: "20px",
  },

  // Danger Box
  dangerBox: {
    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "40px",
  } as React.CSSProperties,
  dangerTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "20px",
    color: "#fecaca",
  },

  // Two Column
  twoColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "start",
  } as React.CSSProperties,
  textColumn: {},
  imageColumn: {},
  subtitle: {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: "20px",
    color: "#f1f5f9",
  },

  // Bad Food Grid
  badFoodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  } as React.CSSProperties,
  badFoodCard: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
  } as React.CSSProperties,
  badFoodIcon: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  badFoodLabel: {
    fontSize: "0.9rem",
    color: "#fecaca",
    fontWeight: 600,
  },

  // Animation Box
  animationBox: {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    padding: "40px",
    marginTop: "30px",
  },
  pancreasAnimation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  } as React.CSSProperties,
  pancreas: {
    fontSize: "4rem",
    animation: "float 2s ease-in-out infinite",
  },
  insulinBurst: {
    display: "flex",
    gap: "10px",
    fontSize: "2rem",
  } as React.CSSProperties,
  animationLabel: {
    fontSize: "1rem",
    color: "#94a3b8",
    textAlign: "center",
    marginTop: "10px",
  } as React.CSSProperties,

  // Comparison Box
  comparisonBox: {
    marginBottom: "40px",
  },
  comparisonTitle: {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: "20px",
    color: "#f1f5f9",
  },
  analogyBox: {
    background: "rgba(251, 191, 36, 0.1)",
    border: "2px solid rgba(251, 191, 36, 0.3)",
    borderRadius: "15px",
    padding: "30px",
    marginTop: "20px",
  } as React.CSSProperties,
  analogyText: {
    fontSize: "1.3rem",
    lineHeight: 1.8,
    color: "#fde68a",
    margin: 0,
    fontStyle: "italic",
  },

  // Resistance Flow
  resistanceFlow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    margin: "60px 0",
    flexWrap: "wrap",
  } as React.CSSProperties,
  resistanceCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "40px",
    minWidth: "250px",
  },
  resistanceTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "30px",
    textAlign: "center",
    color: "#f1f5f9",
  } as React.CSSProperties,
  cellNormal: {
    textAlign: "center",
  } as React.CSSProperties,
  cellResistant: {
    textAlign: "center",
  } as React.CSSProperties,
  cellIcon: {
    fontSize: "4rem",
    marginBottom: "15px",
  },
  cellLabel: {
    fontSize: "1.1rem",
    color: "#cbd5e1",
    marginBottom: "20px",
  },
  receptors: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    fontSize: "2rem",
  },
  transformArrow: {
    fontSize: "3rem",
    color: "#ef4444",
  },

  // Warning Box
  warningBox: {
    background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
    border: "2px solid rgba(251, 191, 36, 0.4)",
    borderRadius: "20px",
    padding: "40px",
  } as React.CSSProperties,
  warningTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "20px",
    color: "#fde68a",
  },
  criticalBox: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "15px",
    padding: "25px",
    marginTop: "20px",
  } as React.CSSProperties,
  criticalText: {
    fontSize: "1.2rem",
    lineHeight: 1.8,
    color: "#fecaca",
    margin: "10px 0",
  },

  // Factory Box
  factoryBox: {
    background: "rgba(139, 92, 246, 0.1)",
    border: "2px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "60px",
  } as React.CSSProperties,
  factoryTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "20px",
    color: "#c4b5fd",
  },
  conversionFlow: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginTop: "40px",
    overflowX: "auto",
    padding: "20px",
  } as React.CSSProperties,
  conversionStep: {
    textAlign: "center",
    minWidth: "150px",
  } as React.CSSProperties,
  conversionIcon: {
    fontSize: "3rem",
    marginBottom: "10px",
  },

  // Fat Types Grid
  fatTypesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  } as React.CSSProperties,
  fatTypeCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  fatTypeHeader: {
    padding: "25px",
    textAlign: "center",
  } as React.CSSProperties,
  fatTypeName: {
    fontSize: "1.5rem",
    fontWeight: 800,
    marginBottom: "10px",
    color: "#fff",
  },
  dangerBadge: {
    background: "rgba(0, 0, 0, 0.3)",
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "1px",
    display: "inline-block",
  } as React.CSSProperties,
  warningBadge: {
    background: "rgba(0, 0, 0, 0.3)",
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "1px",
    display: "inline-block",
  } as React.CSSProperties,
  infoBadge: {
    background: "rgba(0, 0, 0, 0.3)",
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "1px",
    display: "inline-block",
  } as React.CSSProperties,
  fatTypeContent: {
    padding: "30px",
  },
  fatTypeList: {
    listStyle: "none",
    padding: 0,
    margin: "20px 0 0",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "20px 0",
  },
  listItem: {
    display: "flex",
    alignItems: "start",
    gap: "10px",
    marginBottom: "15px",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
    paddingLeft: "25px",
    position: "relative",
  } as React.CSSProperties,

  // Cancer Section
  cancerIntro: {
    marginBottom: "60px",
  },
  cancerMechanisms: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "30px",
    marginBottom: "60px",
  } as React.CSSProperties,
  mechanismCard: {
    background: "rgba(239, 68, 68, 0.05)",
    border: "2px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "20px",
    padding: "30px",
  },
  mechanismNumber: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "1.5rem",
    fontWeight: 900,
  } as React.CSSProperties,
  mechanismTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "15px",
    textAlign: "center",
    color: "#f1f5f9",
  } as React.CSSProperties,
  mechanismText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
    marginBottom: "20px",
  },
  mechanismDanger: {
    background: "rgba(220, 38, 38, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "15px",
  },
  igfEffects: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  } as React.CSSProperties,
  igfEffect: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  igfIcon: {
    fontSize: "2rem",
  },
  warburgBox: {
    background: "rgba(139, 92, 246, 0.1)",
    border: "2px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "15px",
  } as React.CSSProperties,
  warburgText: {
    fontSize: "1.05rem",
    lineHeight: 1.8,
    color: "#c4b5fd",
    margin: "10px 0",
  },
  comboBox: {
    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(239, 68, 68, 0.1) 100%)",
    border: "3px solid rgba(239, 68, 68, 0.5)",
    borderRadius: "20px",
    padding: "40px",
  } as React.CSSProperties,
  comboTitle: {
    fontSize: "2.5rem",
    fontWeight: 900,
    marginBottom: "30px",
    textAlign: "center",
    color: "#fecaca",
  } as React.CSSProperties,
  comboItems: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "25px",
  } as React.CSSProperties,
  comboItem: {
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
  } as React.CSSProperties,
  comboIcon: {
    fontSize: "3rem",
    display: "block",
    marginBottom: "15px",
  },

  // Brain Section
  brainIntro: {
    marginBottom: "60px",
  },
  brainProblems: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  } as React.CSSProperties,
  brainProblem: {
    background: "rgba(59, 130, 246, 0.05)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    borderRadius: "20px",
    padding: "40px",
  },
  brainProblemHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  brainIcon: {
    fontSize: "3rem",
  },
  brainProblemTitle: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
  },
  alzheimersBox: {
    background: "rgba(139, 92, 246, 0.1)",
    border: "2px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "15px",
    padding: "25px",
    marginTop: "20px",
  } as React.CSSProperties,
  alzheimersText: {
    fontSize: "1.2rem",
    lineHeight: 1.8,
    color: "#c4b5fd",
    margin: "10px 0",
  },
  equationBox: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "15px",
    textAlign: "center",
  } as React.CSSProperties,
  equation: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#fecaca",
    margin: 0,
  },
  cycleBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    overflowX: "auto",
    padding: "30px 20px",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    marginTop: "20px",
  } as React.CSSProperties,
  cycleStep: {
    textAlign: "center",
    minWidth: "120px",
  } as React.CSSProperties,
  viciosoText: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#fecaca",
    textAlign: "center",
    marginTop: "20px",
  } as React.CSSProperties,

  // Energy Section
  energyParadox: {
    background: "rgba(251, 191, 36, 0.1)",
    border: "2px solid rgba(251, 191, 36, 0.3)",
    borderRadius: "20px",
    padding: "50px",
  } as React.CSSProperties,
  paradoxTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: "30px",
    textAlign: "center",
    color: "#fde68a",
  } as React.CSSProperties,
  insulinLock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    margin: "50px 0",
    flexWrap: "wrap",
  } as React.CSSProperties,
  fatStorage: {
    textAlign: "center",
  } as React.CSSProperties,
  fatIcon: {
    fontSize: "5rem",
    marginBottom: "15px",
  },
  fatLabel: {
    fontSize: "1.2rem",
    color: "#cbd5e1",
  },
  lockIcon: {
    fontSize: "4rem",
    color: "#ef4444",
  },
  insulinLabel: {
    textAlign: "center",
  } as React.CSSProperties,
  resultBox: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "15px",
    padding: "30px",
    marginTop: "40px",
  } as React.CSSProperties,
  resultText: {
    fontSize: "1.5rem",
    lineHeight: 1.8,
    color: "#fecaca",
    textAlign: "center",
    marginBottom: "30px",
  },
  resultSymptoms: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  } as React.CSSProperties,
  symptom: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    fontSize: "3rem",
  } as React.CSSProperties,

  // Diabetes Section
  diabetesBox: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "20px",
    padding: "50px",
    marginBottom: "60px",
  } as React.CSSProperties,
  diabetesTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: "30px",
    textAlign: "center",
    color: "#fecaca",
  } as React.CSSProperties,
  pancreasTimeline: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    margin: "50px 0",
    overflowX: "auto",
    padding: "20px",
  } as React.CSSProperties,
  timelineStage: {
    textAlign: "center",
    minWidth: "180px",
  } as React.CSSProperties,
  stageIcon: {
    fontSize: "4rem",
    marginBottom: "15px",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    borderRadius: "50%",
    width: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
  } as React.CSSProperties,
  stageName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#f1f5f9",
  },
  stageDesc: {
    fontSize: "0.95rem",
    color: "#cbd5e1",
  },
  diabetesConsequences: {
    marginTop: "50px",
  },
  consequencesTitle: {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: "30px",
    textAlign: "center",
    color: "#fecaca",
  } as React.CSSProperties,
  consequencesList: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  } as React.CSSProperties,
  consequence: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    fontSize: "3rem",
  } as React.CSSProperties,

  // Video Section
  videoSection: {
    marginTop: "60px",
    background: "rgba(59, 130, 246, 0.05)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    borderRadius: "20px",
    padding: "40px",
  },
  videoSectionTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "30px",
    textAlign: "center",
    color: "#93c5fd",
  } as React.CSSProperties,
  videoCard: {
    cursor: "pointer",
  },
  videoThumbnail: {
    position: "relative",
    paddingTop: "56.25%",
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "transform 0.3s ease",
  } as React.CSSProperties,
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(59, 130, 246, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "#fff",
  } as React.CSSProperties,
  videoTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: 600,
  } as React.CSSProperties,
  videoModal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  } as React.CSSProperties,
  videoModalContent: {
    position: "relative",
    width: "100%",
    maxWidth: "1000px",
  } as React.CSSProperties,
  closeButton: {
    position: "absolute",
    top: "-50px",
    right: 0,
    background: "rgba(59, 130, 246, 0.9)",
    border: "none",
    color: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  video: {
    width: "100%",
    borderRadius: "10px",
  },

  // Diet Section
  principlesBox: {
    background: "rgba(16, 185, 129, 0.1)",
    border: "2px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "60px",
  } as React.CSSProperties,
  principlesTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "30px",
    textAlign: "center",
    color: "#6ee7b7",
  } as React.CSSProperties,
  principlesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  } as React.CSSProperties,
  principleCard: {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  principleIcon: {
    fontSize: "3rem",
    display: "block",
    marginBottom: "15px",
  },
  weekPlan: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "30px",
  } as React.CSSProperties,
  dayPlanCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "30px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  dayPlanHeader: {
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  dayPlanName: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#f1f5f9",
    margin: 0,
  },
  dayPlanMeals: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  } as React.CSSProperties,
  mealRow: {
    display: "flex",
    gap: "15px",
    alignItems: "start",
  },
  mealIcon: {
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  mealContent: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
  },

  // Exercise Section
  exerciseWhy: {
    background: "rgba(139, 92, 246, 0.1)",
    border: "2px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "20px",
    padding: "50px",
    marginBottom: "60px",
  } as React.CSSProperties,
  exerciseWhyTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: "40px",
    textAlign: "center",
    color: "#c4b5fd",
  } as React.CSSProperties,
  exerciseReasons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  } as React.CSSProperties,
  reasonCard: {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    padding: "30px",
    textAlign: "center",
  } as React.CSSProperties,
  reasonIcon: {
    fontSize: "4rem",
    display: "block",
    marginBottom: "20px",
  },
  reasonTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#f1f5f9",
  },
  reasonText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
  },
  exercisePlan: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  } as React.CSSProperties,
  workoutCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    padding: "35px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  workoutHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  } as React.CSSProperties,
  workoutDay: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  workoutIcon: {
    fontSize: "2.5rem",
  },
  workoutDayName: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#f1f5f9",
    margin: 0,
  },
  workoutType: {
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
  } as React.CSSProperties,
  workoutExercises: {
    marginBottom: "25px",
  },
  exercisesTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#cbd5e1",
  },
  exerciseList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px",
  },
  exerciseItem: {
    fontSize: "1rem",
    lineHeight: 1.8,
    color: "#94a3b8",
    paddingLeft: "25px",
    position: "relative",
    marginBottom: "10px",
  } as React.CSSProperties,
  workoutSets: {
    fontSize: "1rem",
    color: "#cbd5e1",
  },
  workoutBenefit: {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    padding: "20px",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#94a3b8",
  },
  finalMessageBox: {
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
    border: "3px solid rgba(16, 185, 129, 0.5)",
    borderRadius: "20px",
    padding: "50px",
    marginTop: "80px",
  } as React.CSSProperties,
  finalMessageTitle: {
    fontSize: "3rem",
    fontWeight: 900,
    marginBottom: "50px",
    textAlign: "center",
    color: "#6ee7b7",
  } as React.CSSProperties,
  finalMessageGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  } as React.CSSProperties,
  finalMessageCard: {
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    minWidth: "200px",
  } as React.CSSProperties,
  finalMessageIcon: {
    fontSize: "4rem",
    display: "block",
    marginBottom: "20px",
  },
  finalMessageCardTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#f1f5f9",
  },
  finalMessageText: {
    fontSize: "1.1rem",
    color: "#cbd5e1",
  },
  plusSign: {
    fontSize: "3rem",
    fontWeight: 900,
    color: "#10b981",
  },
  equalsSign: {
    fontSize: "3rem",
    fontWeight: 900,
    color: "#10b981",
  },

  // Footer
  footer: {
    padding: "60px 20px",
    background: "rgba(0, 0, 0, 0.3)",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  footerContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  } as React.CSSProperties,
  footerText: {
    fontSize: "1.3rem",
    fontWeight: 600,
    marginBottom: "15px",
    color: "#f1f5f9",
  },
  footerSubtext: {
    fontSize: "1rem",
    color: "#94a3b8",
    margin: 0,
  },
};
