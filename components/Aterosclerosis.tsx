"use client";

import React, { useState, useEffect } from "react";

export default function Aterosclerosis() {
  const [activeSection, setActiveSection] = useState(0);
  const [showVideo, setShowVideo] = useState<string | null>(null);

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
      title: "La Aterosclerosis Explicada",
      subtitle: "Cuando el colesterol se vuelve 'rancio'",
      icon: "🫀",
    },
    {
      id: "oxidacion",
      title: "La Oxidación del Colesterol",
      subtitle: "El proceso de 'pudrición' molecular",
      icon: "🧪",
    },
    {
      id: "celulas-espumosas",
      title: "Células Espumosas",
      subtitle: "El suicidio de los macrófagos",
      icon: "💥",
    },
    {
      id: "calcificacion",
      title: "Calcificación y Ruptura",
      subtitle: "El camino hacia el infarto",
      icon: "⚡",
    },
    {
      id: "ldl-hdl",
      title: "LDL vs HDL",
      subtitle: "El malo y el bueno",
      icon: "⚖️",
    },
    {
      id: "dieta",
      title: "Protocolo Anti-Óxido",
      subtitle: "Tu dieta para arterias limpias",
      icon: "🥗",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroAnimation}>
            <div style={styles.pulseCircle}></div>
            <div style={styles.pulseCircle} className="delay-1"></div>
            <div style={styles.pulseCircle} className="delay-2"></div>
          </div>
          <h1 style={styles.heroTitle}>
            <span style={styles.gradientText}>Aterosclerosis</span>
          </h1>
          <p style={styles.heroSubtitle}>
            La verdad científica sobre cómo el colesterol oxidado destruye tus
            arterias
          </p>
          <div style={styles.heroStats}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>70%</div>
              <div style={styles.statLabel}>Muertes cardiovasculares</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>100%</div>
              <div style={styles.statLabel}>Prevenible con dieta</div>
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

      {/* Section 1: Introducción */}
      <section
        id="intro"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🫀</span>
            <h2 style={styles.sectionTitle}>
              Cuando el Colesterol se Vuelve "Rancio"
            </h2>
          </div>

          <div style={styles.twoColumn}>
            <div style={styles.textColumn}>
              <h3 style={styles.subtitle}>El Ejemplo de la Cocina</h3>
              <p style={styles.paragraph}>
                Si dejas una barra de <strong>mantequilla</strong> al sol
                durante tres días:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.emoji}>🎨</span>
                  <strong>Cambia de color:</strong> Se pone más oscura o
                  amarillenta
                </li>
                <li style={styles.listItem}>
                  <span style={styles.emoji}>👃</span>
                  <strong>Cambia de olor:</strong> Huele agrio, fuerte y
                  desagradable
                </li>
                <li style={styles.listItem}>
                  <span style={styles.emoji}>😖</span>
                  <strong>Cambia de sabor:</strong> Sabe horrible
                </li>
              </ul>
              <div style={styles.highlightBox}>
                <p style={styles.highlightText}>
                  Eso es estar <strong>rancio</strong>. El oxígeno del aire
                  atacó a la grasa de la mantequilla y transformó sus moléculas
                  en algo tóxico. Ya no es alimento, es basura.
                </p>
              </div>
            </div>

            <div style={styles.imageColumn}>
              <div style={styles.comparisonGrid}>
                <div style={styles.comparisonCard}>
                  <img
                    src="https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80"
                    alt="Mantequilla fresca"
                    style={styles.comparisonImage}
                  />
                  <div style={styles.comparisonLabel}>
                    <span style={styles.emoji}>✅</span> Fresca
                  </div>
                </div>
                <div style={styles.comparisonCard}>
                  <div
                    style={{
                      ...styles.comparisonImage,
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #654321 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "60px",
                    }}
                  >
                    🤮
                  </div>
                  <div
                    style={{
                      ...styles.comparisonLabel,
                      background:
                        "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    }}
                  >
                    <span style={styles.emoji}>❌</span> Rancia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Oxidación */}
      <section
        id="oxidacion"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🧪</span>
            <h2 style={styles.sectionTitle}>Lo Mismo Pasa Dentro de Ti</h2>
          </div>

          <div style={styles.processFlow}>
            <div style={styles.flowCard}>
              <div style={styles.flowNumber}>1</div>
              <h3 style={styles.flowTitle}>LDL Normal</h3>
              <p style={styles.flowText}>
                El LDL es una bolita de grasa y proteína viajando por tu sangre
                (que está caliente y llena de oxígeno).
              </p>
              <div style={styles.illustration}>
                <div style={styles.ldlParticle}>
                  <div style={styles.ldlCore}></div>
                </div>
              </div>
            </div>

            <div style={styles.flowArrow}>→</div>

            <div style={styles.flowCard}>
              <div style={styles.flowNumber}>2</div>
              <h3 style={styles.flowTitle}>Ataque de Radicales</h3>
              <p style={styles.flowText}>
                Los <strong>Radicales Libres</strong> atacan la grasa del LDL.
                La grasa se degrada y se rompe.
              </p>
              <div style={styles.illustration}>
                <div style={styles.ldlParticle}>
                  <div
                    style={{ ...styles.ldlCore, animation: "shake 0.5s infinite" }}
                  ></div>
                  <div style={styles.radical}>⚡</div>
                  <div style={{ ...styles.radical, animationDelay: "0.2s" }}>
                    ⚡
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.flowArrow}>→</div>

            <div style={styles.flowCard}>
              <div
                style={{
                  ...styles.flowNumber,
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                }}
              >
                3
              </div>
              <h3 style={styles.flowTitle}>LDL Oxidado</h3>
              <p style={styles.flowText}>
                Esa bolita de colesterol, que antes era útil, ahora es una{" "}
                <strong>bola de grasa podrida</strong>.
              </p>
              <div style={styles.illustration}>
                <div
                  style={{
                    ...styles.ldlParticle,
                    filter: "hue-rotate(180deg) saturate(0.5)",
                  }}
                >
                  <div
                    style={{
                      ...styles.ldlCore,
                      background:
                        "linear-gradient(135deg, #8B4513 0%, #654321 100%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.dangerBox}>
            <h3 style={styles.dangerTitle}>🚨 ¿Por qué es tan grave?</h3>
            <div style={styles.comparisonTable}>
              <div style={styles.tableRow}>
                <div style={styles.tableCell}>
                  <strong>Si el LDL está FRESCO:</strong>
                </div>
                <div style={styles.tableCell}>
                  Tus células dicen: <em>"¡Mmm, comida! ¡Materiales!"</em>.
                  Abren sus puertas y lo usan.
                </div>
              </div>
              <div style={styles.tableRow}>
                <div style={styles.tableCell}>
                  <strong>Si el LDL está RANCIO:</strong>
                </div>
                <div style={styles.tableCell}>
                  <ol style={styles.orderedList}>
                    <li>
                      Tus células lo rechazan: <em>"¡Guácala! Eso está podrido"</em>
                    </li>
                    <li>El LDL se queda acumulado en la arteria</li>
                    <li>El sistema inmune lo ataca como si fuera veneno</li>
                    <li>Llegan los macrófagos a eliminarlo</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Células Espumosas */}
      <section
        id="celulas-espumosas"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>💥</span>
            <h2 style={styles.sectionTitle}>Células Espumosas: El Suicidio</h2>
          </div>

          <div style={styles.twoColumn}>
            <div style={styles.textColumn}>
              <h3 style={styles.subtitle}>¿Por qué "Espumosas"?</h3>
              <p style={styles.paragraph}>
                Si miraras una de estas células bajo un microscopio,{" "}
                <strong>parece literalmente espuma</strong> de afeitar o una
                esponja llena de jabón.
              </p>

              <div style={styles.infoBox}>
                <h4 style={styles.infoTitle}>La Causa:</h4>
                <p style={styles.paragraph}>
                  El macrófago se come tantas gotitas de grasa (colesterol
                  oxidado) que su interior se llena de miles de burbujas de
                  grasa microscópicas.
                </p>
              </div>

              <div style={styles.infoBox}>
                <h4 style={styles.infoTitle}>El Resultado:</h4>
                <p style={styles.paragraph}>
                  El macrófago ya no puede moverse ni patrullar. Se queda
                  quieto, gordo y lleno de grasa. Ha pasado de ser un{" "}
                  <strong>soldado ágil</strong> a ser una{" "}
                  <strong>bolsa de basura inmovilizada</strong>.
                </p>
              </div>
            </div>

            <div style={styles.imageColumn}>
              <div style={styles.macrophageAnimation}>
                <div style={styles.healthyMacrophage}>
                  <div style={styles.macrophageLabel}>Macrófago Sano</div>
                  <div style={styles.macrophageIcon}>🦠</div>
                </div>
                <div style={styles.transformArrow}>↓</div>
                <div style={styles.foamCell}>
                  <div style={styles.macrophageLabel}>Célula Espumosa</div>
                  <div style={styles.foamBubbles}>
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.bubble,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.timelineBox}>
            <h3 style={styles.timelineTitle}>
              El "Flow" de la Muerte: Paso a Paso
            </h3>
            <div style={styles.timeline}>
              {[
                {
                  step: "Paso 1",
                  title: "La Estría Grasa",
                  description:
                    "Millones de macrófagos espumosos se amontonan debajo de la pared arterial. Una línea amarilla de grasa pura.",
                },
                {
                  step: "Paso 2",
                  title: "La Muerte Celular",
                  description:
                    "Las células espumosas revientan. Sueltan colesterol podrido y enzimas ácidas. Núcleo Necrótico.",
                },
                {
                  step: "Paso 3",
                  title: "La Muralla",
                  description:
                    "El cuerpo construye una tapa dura (fibrosis + calcio) encima de la grasa para contenerla.",
                },
                {
                  step: "Paso 4",
                  title: "La Placa Inestable",
                  description:
                    "Por fuera: cáscara dura de calcio. Por dentro: papilla blanda de grasa muerta.",
                },
                {
                  step: "Paso 5",
                  title: "La Ruptura",
                  description:
                    "Presión arterial sube. La cáscara rígida se rompe. La papilla tóxica queda expuesta.",
                },
                {
                  step: "Paso 6",
                  title: "El Trombo",
                  description:
                    "Plaquetas detectan la herida. Forman un coágulo gigante para sellar. Tapan toda la arteria.",
                },
                {
                  step: "Paso 7",
                  title: "El Infarto",
                  description:
                    "El coágulo bloquea el flujo de sangre. Las células se asfixian. Muerte del tejido.",
                },
              ].map((item, index) => (
                <div key={index} style={styles.timelineItem}>
                  <div
                    style={{
                      ...styles.timelineMarker,
                      ...(index >= 5 ? styles.timelineMarkerDanger : {}),
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={styles.timelineContent}>
                    <h4 style={styles.timelineStepTitle}>{item.title}</h4>
                    <p style={styles.timelineDescription}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Calcificación */}
      <section
        id="calcificacion"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>⚡</span>
            <h2 style={styles.sectionTitle}>
              De Calcificación a Trombo: La Tragedia Final
            </h2>
          </div>

          <div style={styles.videoGrid}>
            <div style={styles.videoCard}>
              <div
                style={styles.videoThumbnail}
                onClick={() => setShowVideo("video1")}
              >
                <div style={styles.playButton}>▶</div>
                <div style={styles.videoTitle}>
                  Arteria Obstruida por Trombos
                </div>
              </div>
            </div>
            <div style={styles.videoCard}>
              <div
                style={styles.videoThumbnail}
                onClick={() => setShowVideo("video2")}
              >
                <div style={styles.playButton}>▶</div>
                <div style={styles.videoTitle}>
                  Explicación Animada de Aterosclerosis
                </div>
              </div>
            </div>
          </div>

          {showVideo && (
            <div
              style={styles.videoModal}
              onClick={() => setShowVideo(null)}
            >
              <div
                style={styles.videoModalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  style={styles.closeButton}
                  onClick={() => setShowVideo(null)}
                >
                  ✕
                </button>
                <video
                  controls
                  autoPlay
                  style={styles.video}
                  src={
                    showVideo === "video1"
                      ? "/aterosclerosis/Video_Arteria_Obstruida_Por_Trombos.mp4"
                      : "/aterosclerosis/Video_Chistoso_Sobre_Aterosclerosis.mp4"
                  }
                >
                  Tu navegador no soporta el tag de video.
                </video>
              </div>
            </div>
          )}

          <div style={styles.warningBox}>
            <h3 style={styles.warningTitle}>⚠️ La Ironía Mortal</h3>
            <p style={styles.paragraph}>
              <strong>Tu cuerpo te mata intentando curarte.</strong>
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                El <strong>calcio</strong> era para contener la grasa tóxica
              </li>
              <li style={styles.listItem}>
                El <strong>trombo</strong> era para curar la grieta
              </li>
              <li style={styles.listItem}>
                Pero el resultado en un espacio tan estrecho es{" "}
                <strong>fatal</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: LDL vs HDL */}
      <section
        id="ldl-hdl"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>⚖️</span>
            <h2 style={styles.sectionTitle}>
              El Malo (LDL) vs El Bueno (HDL)
            </h2>
          </div>

          <div style={styles.vsContainer}>
            <div style={styles.vsCard}>
              <div style={styles.vsHeader}>
                <h3 style={styles.vsTitle}>
                  <span style={styles.badBadge}>MALO</span>
                  LDL
                </h3>
              </div>
              <div style={styles.vsContent}>
                <div style={styles.vsIcon}>📦</div>
                <h4 style={styles.vsSubtitle}>El Camión de Reparto Sobrante</h4>
                <ul style={styles.vsList}>
                  <li>Nace del VLDL después de entregar grasa</li>
                  <li>Es una furgoneta pequeña cargada de colesterol</li>
                  <li>Si las células no lo necesitan, se queda dando vueltas</li>
                  <li>Se oxida (se pudre) y se mete debajo de la arteria</li>
                  <li>
                    <strong>Baja densidad = Mucho colesterol, poca proteína</strong>
                  </li>
                </ul>
              </div>
              <div style={styles.ldlAnimation}>
                <div style={styles.ldlTruck}>🚚</div>
                <div style={styles.oxidationCloud}>☠️</div>
              </div>
            </div>

            <div style={styles.vsVs}>VS</div>

            <div style={styles.vsCard}>
              <div style={styles.vsHeader}>
                <h3 style={styles.vsTitle}>
                  <span style={styles.goodBadge}>BUENO</span>
                  HDL
                </h3>
              </div>
              <div style={styles.vsContent}>
                <div style={styles.vsIcon}>🧹</div>
                <h4 style={styles.vsSubtitle}>El Camión de Basura</h4>
                <ul style={styles.vsList}>
                  <li>Creado intencionalmente por el hígado</li>
                  <li>Sale vacío y plano como un disco</li>
                  <li>Busca colesterol sobrante en arterias</li>
                  <li>Alivia a los macrófagos quitándoles carga</li>
                  <li>
                    <strong>Alta densidad = Mucha proteína, poco colesterol</strong>
                  </li>
                </ul>
              </div>
              <div style={styles.hdlAnimation}>
                <div style={styles.hdlCleaner}>🧹✨</div>
              </div>
            </div>
          </div>

          <div style={styles.keyBox}>
            <h3 style={styles.keyTitle}>🔑 Puntos Clave del Colesterol</h3>
            <div style={styles.keyGrid}>
              <div style={styles.keyCard}>
                <div style={styles.keyNumber}>1</div>
                <h4 style={styles.keyCardTitle}>El Colesterol es Vital</h4>
                <p style={styles.keyCardText}>
                  Construye membranas celulares, hormonas sexuales, mielina
                  cerebral y bilis digestiva
                </p>
              </div>
              <div style={styles.keyCard}>
                <div style={styles.keyNumber}>2</div>
                <h4 style={styles.keyCardTitle}>VLDL se transforma en LDL</h4>
                <p style={styles.keyCardText}>
                  El VLDL reparte grasa, se vacía y se convierte en LDL (que
                  lleva solo colesterol)
                </p>
              </div>
              <div style={styles.keyCard}>
                <div style={styles.keyNumber}>3</div>
                <h4 style={styles.keyCardTitle}>El problema es la oxidación</h4>
                <p style={styles.keyCardText}>
                  LDL fresco es útil. LDL oxidado (rancio) es tóxico y causa
                  aterosclerosis
                </p>
              </div>
              <div style={styles.keyCard}>
                <div style={styles.keyNumber}>4</div>
                <h4 style={styles.keyCardTitle}>HDL es el héroe</h4>
                <p style={styles.keyCardText}>
                  Limpia el colesterol oxidado y lo lleva de vuelta al hígado
                  para eliminarlo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Dieta */}
      <section
        id="dieta"
        className="content-section"
        style={styles.section}
      >
        <div style={styles.sectionContent}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>🥗</span>
            <h2 style={styles.sectionTitle}>Protocolo Anti-Óxido</h2>
            <p style={styles.sectionSubtitle}>
              Tu Dieta de Blindaje Arterial para Bogotá
            </p>
          </div>

          <div style={styles.objectivesBox}>
            <h3 style={styles.objectivesTitle}>🎯 Los 3 Objetivos</h3>
            <div style={styles.objectivesGrid}>
              <div style={styles.objectiveCard}>
                <div style={styles.objectiveIcon}>🛡️</div>
                <h4 style={styles.objectiveTitle}>Evitar grietas</h4>
                <p style={styles.objectiveText}>
                  Mantener el endotelio liso y protegido
                </p>
              </div>
              <div style={styles.objectiveCard}>
                <div style={styles.objectiveIcon}>🧊</div>
                <h4 style={styles.objectiveTitle}>Evitar oxidación</h4>
                <p style={styles.objectiveText}>
                  Que el LDL no se ponga rancio
                </p>
              </div>
              <div style={styles.objectiveCard}>
                <div style={styles.objectiveIcon}>🚛</div>
                <h4 style={styles.objectiveTitle}>Aumentar HDL</h4>
                <p style={styles.objectiveText}>
                  Más camiones de basura limpiando
                </p>
              </div>
            </div>
          </div>

          {/* Diet Categories */}
          <div style={styles.dietSection}>
            <h3 style={styles.dietTitle}>
              <span style={styles.emoji}>🛡️</span> Escudo Antioxidante
            </h3>
            <p style={styles.dietDescription}>
              Alimentos para neutralizar radicales libres y proteger el LDL
            </p>
            <div style={styles.foodGrid}>
              {[
                {
                  name: "Frutos Rojos",
                  items: "Moras, Arándanos, Fresas, Agraz",
                  image:
                    "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&q=80",
                },
                {
                  name: "Cacao Puro",
                  items: "Chocolate >85%",
                  image:
                    "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&q=80",
                },
                {
                  name: "Té Verde",
                  items: "Matcha",
                  image:
                    "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300&q=80",
                },
                {
                  name: "Vegetales Verdes",
                  items: "Espinaca, Rúcula",
                  image:
                    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&q=80",
                },
              ].map((food, index) => (
                <div key={index} style={styles.foodCard}>
                  <div
                    style={{
                      ...styles.foodImage,
                      backgroundImage: `url(${food.image})`,
                    }}
                  ></div>
                  <div style={styles.foodContent}>
                    <h4 style={styles.foodName}>{food.name}</h4>
                    <p style={styles.foodItems}>{food.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.dietSection}>
            <h3 style={styles.dietTitle}>
              <span style={styles.emoji}>🧹</span> Grasas Limpiadoras
            </h3>
            <p style={styles.dietDescription}>
              Para subir el HDL y reducir inflamación
            </p>
            <div style={styles.foodGrid}>
              {[
                {
                  name: "Aceite de Oliva",
                  items: "Extra Virgen (Crudo)",
                  image:
                    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80",
                },
                {
                  name: "Aguacate",
                  items: "Grasa monoinsaturada",
                  image:
                    "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=80",
                },
                {
                  name: "Pescado Graso",
                  items: "Salmón, Sardinas",
                  image:
                    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&q=80",
                },
                {
                  name: "Nueces",
                  items: "Almendras, Nueces",
                  image:
                    "https://images.unsplash.com/photo-1508747703725-719777637510?w=300&q=80",
                },
              ].map((food, index) => (
                <div key={index} style={styles.foodCard}>
                  <div
                    style={{
                      ...styles.foodImage,
                      backgroundImage: `url(${food.image})`,
                    }}
                  ></div>
                  <div style={styles.foodContent}>
                    <h4 style={styles.foodName}>{food.name}</h4>
                    <p style={styles.foodItems}>{food.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.dietSection}>
            <h3 style={styles.dietTitle}>
              <span style={styles.emoji}>🚫</span> Lo Prohibido
            </h3>
            <p style={styles.dietDescription}>
              El "papel de lija" y el "oxidante"
            </p>
            <div style={styles.forbiddenGrid}>
              <div style={styles.forbiddenCard}>
                <div style={styles.forbiddenIcon}>🍞</div>
                <h4 style={styles.forbiddenName}>Azúcar y Harinas Refinadas</h4>
                <p style={styles.forbiddenReason}>
                  Raya la pared arterial creando grietas
                </p>
              </div>
              <div style={styles.forbiddenCard}>
                <div style={styles.forbiddenIcon}>🧴</div>
                <h4 style={styles.forbiddenName}>Aceites Vegetales Calentados</h4>
                <p style={styles.forbiddenReason}>
                  Soya, girasol, maíz se oxidan al cocinar
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Plan */}
          <div style={styles.weeklyPlan}>
            <h3 style={styles.weeklyTitle}>
              📅 Tu Semana Modelo en Bogotá
            </h3>
            <div style={styles.daysGrid}>
              {[
                {
                  day: "Lunes",
                  theme: "Reinicio Anti-inflamatorio",
                  breakfast: "Huevos pericos + Arepa pequeña + Café negro",
                  lunch:
                    "Pollo a la plancha + Ensalada espinaca/aguacate/fresas",
                  dinner: "Crema de ahuyama casera",
                  exercise: "45 min caminata Parque Virrey (Zona 2)",
                  color: "#3b82f6",
                },
                {
                  day: "Martes",
                  theme: "Fuerza y Sensibilidad Insulina",
                  breakfast: "Frijoles + Huevos revueltos (sin arroz)",
                  lunch: "Trucha a la plancha + Brócoli salteado",
                  dinner: "Omelette de champiñones y queso",
                  exercise: "Pesas (Sentadillas, Peso Muerto)",
                  color: "#8b5cf6",
                },
                {
                  day: "Miércoles",
                  theme: "Ayuno Intermitente Suave",
                  breakfast: "Solo Café negro o Té Verde",
                  lunch: "Carne magra + 3-4 papas criollas + Ensalada",
                  dinner: "Pescado con calabacín",
                  exercise: "Caminar 20 min después del almuerzo",
                  color: "#06b6d4",
                },
                {
                  day: "Jueves",
                  theme: "Carga Omega-3",
                  breakfast: "Huevos duros + Tostada integral con aguacate",
                  lunch: "Salmón/Sardinas + Ensalada tomate/cebolla",
                  dinner: "Pollo desmechado con guacamole",
                  exercise: "Intervalos 20 min (1 min rápido, 2 min caminar)",
                  color: "#10b981",
                },
                {
                  day: "Viernes",
                  theme: "Social (Reducción de Daño)",
                  breakfast: "Omelette con espinacas y queso paipa",
                  lunch: "Lentejas + Huevo frito + Aguacate (sin arroz)",
                  dinner: "Carne o ceviche (si sales)",
                  exercise: "Pesas (Pecho/Espalda)",
                  color: "#f59e0b",
                },
                {
                  day: "Sábado",
                  theme: "Mercado y Naturaleza",
                  breakfast: "Caldo de costilla (poca papa)",
                  lunch: "Asado casero + Chorizo + Guacamole",
                  dinner: "Yogur griego sin azúcar + Nueces",
                  exercise: "Salida larga (Cerros/Bici) 1 hora",
                  color: "#ec4899",
                },
                {
                  day: "Domingo",
                  theme: "Recuperación",
                  breakfast: "Almojábana + Huevos",
                  lunch: "Sancocho (gallina y mazorca, poca papa/yuca)",
                  dinner: "Ayuno temprano (6 pm)",
                  exercise: "Caminata suave o estiramiento",
                  color: "#6366f1",
                },
              ].map((day, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.dayCard,
                    borderLeft: `4px solid ${day.color}`,
                  }}
                >
                  <div style={styles.dayHeader}>
                    <h4 style={styles.dayName}>{day.day}</h4>
                    <p style={styles.dayTheme}>{day.theme}</p>
                  </div>
                  <div style={styles.dayMeals}>
                    <div style={styles.meal}>
                      <span style={styles.mealLabel}>🌅 Desayuno:</span>
                      <span style={styles.mealText}>{day.breakfast}</span>
                    </div>
                    <div style={styles.meal}>
                      <span style={styles.mealLabel}>☀️ Almuerzo:</span>
                      <span style={styles.mealText}>{day.lunch}</span>
                    </div>
                    <div style={styles.meal}>
                      <span style={styles.mealLabel}>🌙 Cena:</span>
                      <span style={styles.mealText}>{day.dinner}</span>
                    </div>
                    <div style={styles.meal}>
                      <span style={styles.mealLabel}>💪 Ejercicio:</span>
                      <span style={styles.mealText}>{day.exercise}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supplements */}
          <div style={styles.supplementsBox}>
            <h3 style={styles.supplementsTitle}>💊 Suplementos (Tu Kit de Ingeniería Química)</h3>
            <div style={styles.supplementsGrid}>
              {[
                {
                  name: "Omega-3",
                  dose: "1g EPA/DHA",
                  when: "Con el almuerzo",
                  why: "Antiinflamatorio potente, evita ruptura arterial",
                },
                {
                  name: "Magnesio",
                  dose: "Glicinato o Citrato",
                  when: "1 hora antes de dormir",
                  why: "Relaja arterias, previene calcificación",
                },
                {
                  name: "Vitamina K2 + D3",
                  dose: "MK-7",
                  when: "Con el desayuno",
                  why: "Dirige calcio a los huesos, no a las arterias",
                },
                {
                  name: "Coenzima Q10",
                  dose: "Ubiquinol",
                  when: "Mañana o almuerzo",
                  why: "Antioxidante del corazón, evita oxidación LDL",
                },
              ].map((supplement, index) => (
                <div key={index} style={styles.supplementCard}>
                  <h4 style={styles.supplementName}>{supplement.name}</h4>
                  <div style={styles.supplementDetail}>
                    <strong>Dosis:</strong> {supplement.dose}
                  </div>
                  <div style={styles.supplementDetail}>
                    <strong>Cuándo:</strong> {supplement.when}
                  </div>
                  <div style={styles.supplementWhy}>{supplement.why}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Commandments */}
          <div style={styles.commandmentsBox}>
            <h3 style={styles.commandmentsTitle}>
              ⚡ Los 3 Mandamientos del Ingeniero
            </h3>
            <div style={styles.commandmentsList}>
              <div style={styles.commandment}>
                <div style={styles.commandmentNumber}>1</div>
                <div style={styles.commandmentText}>
                  <strong>No beberás tus calorías:</strong> Nada de jugos.
                  Come la fruta entera. Toma agua o café.
                </div>
              </div>
              <div style={styles.commandment}>
                <div style={styles.commandmentNumber}>2</div>
                <div style={styles.commandmentText}>
                  <strong>Cocinarás con grasas estables:</strong> Mantequilla,
                  Ghee, Coco para cocinar. Aceite de oliva solo crudo.
                </div>
              </div>
              <div style={styles.commandment}>
                <div style={styles.commandmentNumber}>3</div>
                <div style={styles.commandmentText}>
                  <strong>Dormirás 7-8 horas:</strong> Sin sueño, el cortisol
                  sube y tus arterias estarán rígidas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            💡 <strong>Recuerda:</strong> Si sigues este protocolo al 80%, tus
            exámenes médicos saldrán impecables.
          </p>
          <p style={styles.footerSubtext}>
            Protocolo diseñado con evidencia científica para prevenir aterosclerosis
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bubble {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }

        .delay-1 {
          animation-delay: 0.5s;
        }

        .delay-2 {
          animation-delay: 1s;
        }

        @media (max-width: 768px) {
          .nav-text {
            display: none;
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

  // Hero Section
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
  },
  heroAnimation: {
    position: "relative",
    width: "200px",
    height: "200px",
    margin: "0 auto 40px",
  },
  pulseCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "3px solid #ef4444",
    transform: "translate(-50%, -50%)",
    animation: "pulse 2s ease-out infinite",
  } as React.CSSProperties,
  heroTitle: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: 900,
    margin: "0 0 20px",
    letterSpacing: "-2px",
  },
  gradientText: {
    background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #eab308 100%)",
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
    background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
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
    background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
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

  // Content
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
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#cbd5e1",
    marginBottom: "20px",
  },
  emoji: {
    fontSize: "1.5rem",
    marginRight: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "30px 0",
  },
  listItem: {
    display: "flex",
    alignItems: "start",
    gap: "15px",
    marginBottom: "20px",
    fontSize: "1.1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
  },
  highlightBox: {
    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "15px",
    padding: "30px",
    marginTop: "30px",
  } as React.CSSProperties,
  highlightText: {
    fontSize: "1.2rem",
    lineHeight: 1.8,
    color: "#fecaca",
    margin: 0,
  },

  // Comparison
  comparisonGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  } as React.CSSProperties,
  comparisonCard: {
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  comparisonImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    display: "block",
  } as React.CSSProperties,
  comparisonLabel: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    padding: "15px",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1.1rem",
  } as React.CSSProperties,

  // Process Flow
  processFlow: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "60px",
    overflowX: "auto",
    padding: "40px 20px",
  } as React.CSSProperties,
  flowCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    minWidth: "280px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    flex: "1",
  } as React.CSSProperties,
  flowNumber: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: 900,
    marginBottom: "20px",
  } as React.CSSProperties,
  flowTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#f1f5f9",
  },
  flowText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
  },
  flowArrow: {
    fontSize: "2rem",
    color: "#64748b",
  },
  illustration: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
  ldlParticle: {
    position: "relative",
    width: "80px",
    height: "80px",
  } as React.CSSProperties,
  ldlCore: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    boxShadow: "0 0 30px rgba(251, 191, 36, 0.5)",
  } as React.CSSProperties,
  radical: {
    position: "absolute",
    fontSize: "2rem",
    animation: "float 1s ease-in-out infinite",
  } as React.CSSProperties,

  // Danger Box
  dangerBox: {
    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "20px",
    padding: "40px",
  } as React.CSSProperties,
  dangerTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "30px",
    color: "#fecaca",
  },
  comparisonTable: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  } as React.CSSProperties,
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "30px",
    padding: "20px",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  } as React.CSSProperties,
  tableCell: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
  },
  orderedList: {
    paddingLeft: "20px",
    margin: "10px 0 0",
  },

  // Info Box
  infoBox: {
    background: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    borderRadius: "15px",
    padding: "25px",
    marginBottom: "25px",
  } as React.CSSProperties,
  infoTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#93c5fd",
  },

  // Macrophage Animation
  macrophageAnimation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    padding: "40px",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
  } as React.CSSProperties,
  healthyMacrophage: {
    textAlign: "center",
  } as React.CSSProperties,
  macrophageLabel: {
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#cbd5e1",
  },
  macrophageIcon: {
    fontSize: "4rem",
  },
  transformArrow: {
    fontSize: "3rem",
    color: "#ef4444",
  },
  foamCell: {
    textAlign: "center",
  } as React.CSSProperties,
  foamBubbles: {
    position: "relative",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  } as React.CSSProperties,
  bubble: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.4)",
    animation: "bubble 2s ease-in-out infinite",
    margin: "2px",
  } as React.CSSProperties,

  // Timeline
  timelineBox: {
    marginTop: "60px",
  },
  timelineTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "40px",
    textAlign: "center",
    color: "#f1f5f9",
  } as React.CSSProperties,
  timeline: {
    position: "relative",
    paddingLeft: "60px",
  } as React.CSSProperties,
  timelineItem: {
    display: "flex",
    gap: "30px",
    marginBottom: "40px",
    position: "relative",
  } as React.CSSProperties,
  timelineMarker: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    fontWeight: 900,
    flexShrink: 0,
    position: "relative",
    zIndex: 2,
  } as React.CSSProperties,
  timelineMarkerDanger: {
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  } as React.CSSProperties,
  timelineContent: {
    flex: 1,
    paddingTop: "5px",
  },
  timelineStepTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#f1f5f9",
  },
  timelineDescription: {
    fontSize: "1.05rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
    margin: 0,
  },

  // Warning Box
  warningBox: {
    background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
    border: "2px solid rgba(251, 191, 36, 0.4)",
    borderRadius: "20px",
    padding: "40px",
    marginTop: "60px",
  } as React.CSSProperties,
  warningTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "20px",
    color: "#fde68a",
  },

  // Video Section
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginBottom: "60px",
  } as React.CSSProperties,
  videoCard: {},
  videoThumbnail: {
    position: "relative",
    paddingTop: "56.25%",
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    borderRadius: "15px",
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  } as React.CSSProperties,
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(239, 68, 68, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "#fff",
    transition: "transform 0.3s ease",
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
    background: "rgba(239, 68, 68, 0.9)",
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
    transition: "background 0.3s ease",
  } as React.CSSProperties,
  video: {
    width: "100%",
    borderRadius: "10px",
  },

  // VS Section
  vsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "40px",
    alignItems: "center",
    marginBottom: "60px",
  } as React.CSSProperties,
  vsCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  vsHeader: {
    padding: "30px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  vsTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  } as React.CSSProperties,
  badBadge: {
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "1px",
  } as React.CSSProperties,
  goodBadge: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "1px",
  } as React.CSSProperties,
  vsContent: {
    padding: "40px 30px",
  },
  vsIcon: {
    fontSize: "4rem",
    textAlign: "center",
    marginBottom: "20px",
  } as React.CSSProperties,
  vsSubtitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "25px",
    textAlign: "center",
    color: "#f1f5f9",
  } as React.CSSProperties,
  vsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  vsVs: {
    fontSize: "3rem",
    fontWeight: 900,
    color: "#64748b",
    textAlign: "center",
  } as React.CSSProperties,
  ldlAnimation: {
    padding: "30px",
    textAlign: "center",
    position: "relative",
  } as React.CSSProperties,
  ldlTruck: {
    fontSize: "4rem",
    animation: "float 3s ease-in-out infinite",
  },
  oxidationCloud: {
    fontSize: "2rem",
    position: "absolute",
    top: "20px",
    right: "30%",
  } as React.CSSProperties,
  hdlAnimation: {
    padding: "30px",
    textAlign: "center",
  } as React.CSSProperties,
  hdlCleaner: {
    fontSize: "4rem",
    animation: "float 3s ease-in-out infinite",
  },

  // Key Points
  keyBox: {
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
    border: "2px solid rgba(59, 130, 246, 0.3)",
    borderRadius: "20px",
    padding: "40px",
  } as React.CSSProperties,
  keyTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "40px",
    textAlign: "center",
    color: "#93c5fd",
  } as React.CSSProperties,
  keyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  } as React.CSSProperties,
  keyCard: {
    background: "rgba(0, 0, 0, 0.2)",
    padding: "30px",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  keyNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    fontWeight: 900,
    marginBottom: "20px",
  } as React.CSSProperties,
  keyCardTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#f1f5f9",
  },
  keyCardText: {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
    margin: 0,
  },

  // Diet Section
  objectivesBox: {
    background: "rgba(16, 185, 129, 0.1)",
    border: "2px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "60px",
  } as React.CSSProperties,
  objectivesTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "30px",
    textAlign: "center",
    color: "#6ee7b7",
  } as React.CSSProperties,
  objectivesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  } as React.CSSProperties,
  objectiveCard: {
    background: "rgba(0, 0, 0, 0.2)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  objectiveIcon: {
    fontSize: "3rem",
    marginBottom: "15px",
  },
  objectiveTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#f1f5f9",
  },
  objectiveText: {
    fontSize: "1rem",
    color: "#cbd5e1",
    margin: 0,
  },

  dietSection: {
    marginBottom: "60px",
  },
  dietTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "15px",
    color: "#f1f5f9",
  },
  dietDescription: {
    fontSize: "1.1rem",
    color: "#94a3b8",
    marginBottom: "30px",
  },
  foodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  } as React.CSSProperties,
  foodCard: {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  } as React.CSSProperties,
  foodImage: {
    width: "100%",
    height: "180px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as React.CSSProperties,
  foodContent: {
    padding: "20px",
  },
  foodName: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#f1f5f9",
  },
  foodItems: {
    fontSize: "1rem",
    color: "#94a3b8",
    margin: 0,
  },

  forbiddenGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  } as React.CSSProperties,
  forbiddenCard: {
    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
    border: "2px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "15px",
    padding: "30px",
    textAlign: "center",
  } as React.CSSProperties,
  forbiddenIcon: {
    fontSize: "3rem",
    marginBottom: "15px",
  },
  forbiddenName: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#fecaca",
  },
  forbiddenReason: {
    fontSize: "1rem",
    color: "#cbd5e1",
    margin: 0,
  },

  // Weekly Plan
  weeklyPlan: {
    marginTop: "80px",
  },
  weeklyTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: "50px",
    textAlign: "center",
    color: "#f1f5f9",
  } as React.CSSProperties,
  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "30px",
  } as React.CSSProperties,
  dayCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  } as React.CSSProperties,
  dayHeader: {
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  dayName: {
    fontSize: "1.8rem",
    fontWeight: 800,
    marginBottom: "8px",
    color: "#f1f5f9",
  },
  dayTheme: {
    fontSize: "1rem",
    color: "#94a3b8",
    fontStyle: "italic",
    margin: 0,
  },
  dayMeals: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  } as React.CSSProperties,
  meal: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  } as React.CSSProperties,
  mealLabel: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#94a3b8",
  },
  mealText: {
    fontSize: "1.05rem",
    color: "#cbd5e1",
    lineHeight: 1.5,
  },

  // Supplements
  supplementsBox: {
    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
    border: "2px solid rgba(139, 92, 246, 0.3)",
    borderRadius: "20px",
    padding: "40px",
    marginTop: "60px",
  } as React.CSSProperties,
  supplementsTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "30px",
    textAlign: "center",
    color: "#c4b5fd",
  } as React.CSSProperties,
  supplementsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  } as React.CSSProperties,
  supplementCard: {
    background: "rgba(0, 0, 0, 0.2)",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  supplementName: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#f1f5f9",
  },
  supplementDetail: {
    fontSize: "0.95rem",
    color: "#cbd5e1",
    marginBottom: "8px",
  },
  supplementWhy: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    fontStyle: "italic",
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },

  // Commandments
  commandmentsBox: {
    background: "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
    border: "2px solid rgba(251, 191, 36, 0.4)",
    borderRadius: "20px",
    padding: "40px",
    marginTop: "60px",
  } as React.CSSProperties,
  commandmentsTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: "30px",
    textAlign: "center",
    color: "#fde68a",
  } as React.CSSProperties,
  commandmentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  } as React.CSSProperties,
  commandment: {
    display: "flex",
    alignItems: "start",
    gap: "25px",
    background: "rgba(0, 0, 0, 0.2)",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  commandmentNumber: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: 900,
    flexShrink: 0,
  } as React.CSSProperties,
  commandmentText: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    color: "#cbd5e1",
    flex: 1,
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
