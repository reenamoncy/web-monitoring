import React from "react";

interface StatsPanelProps {
  alerts: {
    critical: number;
    medium: number;
    low: number;
  };
}

const StatsPanel: React.FC<StatsPanelProps> = ({ alerts }) => {
  const getAlertGradient = (level: string) => {
    switch (level) {
      case "critical":
        return "var(--danger-gradient)";
      case "medium":
        return "var(--warning-gradient)";
      case "low":
        return "var(--success-gradient)";
      default:
        return "var(--secondary-gradient)";
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "critical":
        return "🚨";
      case "medium":
        return "⚡";
      case "low":
        return "ℹ️";
      default:
        return "📊";
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle}>System Alerts</h2>
        <div style={styles.headerStats}>
          <span style={styles.totalAlerts}>
            Total Alerts: {alerts.critical + alerts.medium + alerts.low}
          </span>
        </div>
      </div>
      <div style={styles.cardsContainer}>
        {Object.entries(alerts).map(([level, count]) => (
          <div
            key={level}
            className="animate-scale-in"
            style={{
              ...styles.alertCard,
              background: getAlertGradient(level),
            }}
          >
            <div style={styles.cardContent}>
              <div style={styles.iconContainer}>
                <span style={styles.icon}>{getAlertIcon(level)}</span>
                <div style={styles.iconGlow} />
              </div>
              <div style={styles.alertInfo}>
                <div style={styles.count}>{count}</div>
                <div style={styles.label}>{level.toUpperCase()}</div>
              </div>
            </div>
            <div style={styles.cardOverlay} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1.5rem",
    margin: "1.5rem 0",
    position: "relative" as const,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  headerStats: {
    background: "rgba(0,0,0,0.05)",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    fontWeight: 500,
  },
  totalAlerts: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  alertCard: {
    position: "relative" as const,
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    padding: "1.5rem",
    color: "white",
    cursor: "pointer",
    transition:
      "transform var(--transition-fast), box-shadow var(--transition-fast)",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "var(--shadow-hover)",
    },
  },
  cardContent: {
    position: "relative" as const,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  cardOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
    zIndex: 1,
  },
  iconContainer: {
    position: "relative" as const,
    width: "3.5rem",
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
  },
  icon: {
    fontSize: "1.8rem",
    position: "relative" as const,
    zIndex: 2,
  },
  iconGlow: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.5)",
    borderRadius: "50%",
    filter: "blur(8px)",
    opacity: 0.5,
    zIndex: 1,
  },
  alertInfo: {
    flex: 1,
  },
  count: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "0.25rem",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  label: {
    fontSize: "0.9rem",
    opacity: 0.9,
    fontWeight: 500,
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
  },
};

export default StatsPanel;
