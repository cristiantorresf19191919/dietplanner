"use client";

import { useState, useEffect } from "react";

interface DietProgressTrackerProps {
  dietType: "general" | "aterosclerosis" | "insulina";
}

interface DayProgress {
  date: string;
  completed: boolean;
  compliance: number; // 0-100
  notes?: string;
}

interface MonthData {
  [day: string]: DayProgress;
}

interface YearData {
  [month: string]: MonthData;
}

export default function DietProgressTracker({ dietType }: DietProgressTrackerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [progress, setProgress] = useState<YearData>({});
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [todayCompliance, setTodayCompliance] = useState(0);

  const storageKey = `diet-progress-${dietType}-${currentDate.getFullYear()}`;

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading progress:", e);
      }
    }
  }, [storageKey]);

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    }
  }, [progress, storageKey]);

  const getMonthKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  const getDayKey = (date: Date) => {
    return String(date.getDate()).padStart(2, "0");
  };

  const getDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getDayProgress = (date: Date): DayProgress | null => {
    const monthKey = getMonthKey(date);
    const dayKey = getDayKey(date);
    return progress[monthKey]?.[dayKey] || null;
  };

  const setDayProgress = (date: Date, completed: boolean, compliance: number, notes?: string) => {
    const monthKey = getMonthKey(date);
    const dayKey = getDayKey(date);

    setProgress(prev => ({
      ...prev,
      [monthKey]: {
        ...prev[monthKey],
        [dayKey]: {
          date: getDateKey(date),
          completed,
          compliance,
          notes,
        },
      },
    }));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const dayProg = getDayProgress(date);
    setTodayCompliance(dayProg?.compliance || 0);
    setNotes(dayProg?.notes || "");
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedDate) {
      setDayProgress(selectedDate, todayCompliance >= 80, todayCompliance, notes);
      setShowModal(false);
      setSelectedDate(null);
      setNotes("");
      setTodayCompliance(0);
    }
  };

  const getMonthStats = () => {
    const monthKey = getMonthKey(currentDate);
    const monthData = progress[monthKey] || {};
    const days = Object.values(monthData);
    const completed = days.filter(d => d.completed).length;
    const total = days.length;
    const avgCompliance = total > 0
      ? Math.round(days.reduce((sum, d) => sum + d.compliance, 0) / total)
      : 0;

    return { completed, total, avgCompliance };
  };

  const getYearStats = () => {
    let totalDays = 0;
    let completedDays = 0;
    let totalCompliance = 0;

    Object.values(progress).forEach(month => {
      Object.values(month).forEach(day => {
        totalDays++;
        if (day.completed) completedDays++;
        totalCompliance += day.compliance;
      });
    });

    const avgCompliance = totalDays > 0 ? Math.round(totalCompliance / totalDays) : 0;
    const streak = calculateStreak();

    return { totalDays, completedDays, avgCompliance, streak };
  };

  const calculateStreak = () => {
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);

    while (true) {
      const dayProg = getDayProgress(checkDate);
      if (!dayProg || !dayProg.completed) break;
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
      if (streak > 365) break; // Safety limit
    }

    return streak;
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={styles.emptyDay} />);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayProg = getDayProgress(date);
      const isCurrentDay = isToday(date);
      const isFuture = date > new Date();

      days.push(
        <button
          key={day}
          onClick={() => !isFuture && handleDayClick(date)}
          disabled={isFuture}
          style={{
            ...styles.dayCell,
            ...(isCurrentDay ? styles.todayCell : {}),
            ...(dayProg?.completed ? styles.completedCell : {}),
            ...(isFuture ? styles.futureCell : {}),
            opacity: dayProg?.compliance ? 0.3 + (dayProg.compliance / 100) * 0.7 : isFuture ? 0.3 : 1,
          }}
        >
          <span style={styles.dayNumber}>{day}</span>
          {dayProg && dayProg.compliance >= 80 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4EEBC2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={styles.checkIcon}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      );
    }

    return days;
  };

  const monthStats = getMonthStats();
  const yearStats = getYearStats();
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dietColors = {
    general: { primary: "#4EEBC2", secondary: "#E88CED" },
    aterosclerosis: { primary: "#ef4444", secondary: "#f97316" },
    insulina: { primary: "#3b82f6", secondary: "#10b981" },
  };

  const colors = dietColors[dietType];

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes popIn { from { opacity:0; transform:scale(.9) } to { opacity:1; transform:scale(1) } }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={{
          ...styles.title,
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          📅 Seguimiento Anual
        </h2>
        <p style={styles.subtitle}>
          Registra tu progreso diario y mantén tu racha
        </p>
      </div>

      {/* Year Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Días Registrados</div>
          <div style={{ ...styles.statValue, color: colors.primary }}>
            {yearStats.totalDays}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Días Completados</div>
          <div style={{ ...styles.statValue, color: colors.secondary }}>
            {yearStats.completedDays}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Racha Actual</div>
          <div style={{ ...styles.statValue, color: "#fbbf24" }}>
            {yearStats.streak} 🔥
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Promedio Anual</div>
          <div style={{ ...styles.statValue, color: "#a855f7" }}>
            {yearStats.avgCompliance}%
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div style={styles.calendarContainer}>
        {/* Month Navigation */}
        <div style={styles.monthNav}>
          <button onClick={() => changeMonth(-1)} style={styles.monthButton}>
            ←
          </button>
          <div style={styles.monthTitle}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button onClick={() => changeMonth(1)} style={styles.monthButton}>
            →
          </button>
        </div>

        {/* Month Stats */}
        <div style={styles.monthStats}>
          <span style={styles.monthStatItem}>
            Completados: <strong style={{ color: colors.primary }}>{monthStats.completed}/{monthStats.total}</strong>
          </span>
          <span style={styles.monthStatItem}>
            Promedio: <strong style={{ color: colors.secondary }}>{monthStats.avgCompliance}%</strong>
          </span>
        </div>

        {/* Day Labels */}
        <div style={styles.weekDays}>
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
            <div key={day} style={styles.weekDay}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={styles.calendarGrid}>
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendBox, background: colors.primary, opacity: 0.8 }} />
            <span style={styles.legendText}>Completado (80%+)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendBox, background: colors.secondary, opacity: 0.5 }} />
            <span style={styles.legendText}>Parcial (50-79%)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendBox, background: "rgba(255,255,255,0.1)" }} />
            <span style={styles.legendText}>Bajo (&lt;50%)</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedDate && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={styles.closeButton}>
              ✕
            </button>

            <h3 style={styles.modalTitle}>
              {selectedDate.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </h3>

            <div style={styles.modalContent}>
              <label style={styles.label}>
                ¿Qué tan bien seguiste el plan hoy?
              </label>

              <div style={styles.complianceSlider}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={todayCompliance}
                  onChange={e => setTodayCompliance(parseInt(e.target.value))}
                  style={styles.slider}
                />
                <div style={{
                  ...styles.complianceValue,
                  color: todayCompliance >= 80 ? colors.primary : todayCompliance >= 50 ? colors.secondary : "#94a3b8",
                }}>
                  {todayCompliance}%
                </div>
              </div>

              <div style={styles.complianceLabels}>
                <span style={styles.complianceLabel}>No seguí</span>
                <span style={styles.complianceLabel}>Perfecto</span>
              </div>

              <label style={styles.label}>
                Notas (opcional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="¿Cómo te sentiste? ¿Qué comiste?"
                style={styles.textarea}
                rows={4}
              />

              <button
                onClick={handleSave}
                style={{
                  ...styles.saveButton,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                Guardar Progreso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "40px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Outfit', sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
    fontWeight: 800,
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#94a3b8",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "rgba(255, 255, 255, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
    fontWeight: 700,
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 800,
    fontFamily: "'JetBrains Mono', monospace",
  },
  calendarContainer: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "30px",
  },
  monthNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  monthButton: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "10px 20px",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  monthTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#fff",
  },
  monthStats: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "20px",
    fontSize: "0.9rem",
    color: "#cbd5e1",
  },
  monthStatItem: {},
  weekDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
    marginBottom: "10px",
  },
  weekDay: {
    textAlign: "center",
    fontSize: "0.75rem",
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
    marginBottom: "20px",
  },
  emptyDay: {
    aspectRatio: "1",
  },
  dayCell: {
    aspectRatio: "1",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    fontFamily: "inherit",
    color: "#fff",
  },
  todayCell: {
    border: "2px solid #4EEBC2",
    boxShadow: "0 0 20px rgba(78, 235, 194, 0.3)",
  },
  completedCell: {
    background: "rgba(78, 235, 194, 0.2)",
    border: "1px solid rgba(78, 235, 194, 0.4)",
  },
  futureCell: {
    cursor: "not-allowed",
  },
  dayNumber: {
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  checkIcon: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  legendBox: {
    width: "16px",
    height: "16px",
    borderRadius: "4px",
  },
  legendText: {
    fontSize: "0.8rem",
    color: "rgba(255, 255, 255, 0.5)",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease",
  },
  modal: {
    background: "linear-gradient(145deg, #1A1D2E, #14162A)",
    borderRadius: "24px",
    padding: "32px",
    maxWidth: "500px",
    width: "90%",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.5)",
    animation: "popIn 0.4s ease",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "20px",
    background: "none",
    border: "none",
    color: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    fontSize: "1.5rem",
    transition: "color 0.3s ease",
  },
  modalTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "24px",
    textTransform: "capitalize",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    fontSize: "0.9rem",
    color: "#cbd5e1",
    fontWeight: 600,
  },
  complianceSlider: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  slider: {
    flex: 1,
    height: "8px",
    borderRadius: "4px",
    background: "rgba(255, 255, 255, 0.1)",
    outline: "none",
    cursor: "pointer",
  },
  complianceValue: {
    fontSize: "1.8rem",
    fontWeight: 800,
    fontFamily: "'JetBrains Mono', monospace",
    minWidth: "80px",
    textAlign: "right",
  },
  complianceLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.75rem",
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: "-10px",
  },
  complianceLabel: {},
  textarea: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none",
  },
  saveButton: {
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    color: "#0D0F18",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
};
