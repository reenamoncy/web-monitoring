import React from "react";

const Header: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIconContainer}>
            <span style={styles.logoIcon}>🖥️</span>
          </div>
          <div style={styles.titleContainer}>
            <h1 style={styles.title}>Server Monitor</h1>
            <div style={styles.subtitle}>Dashboard</div>
          </div>
        </div>
        <div style={styles.dateTimeContainer}>
          <div style={styles.timeContainer}>
            <div style={styles.time}>{formattedTime}</div>
            <div style={styles.date}>{formattedDate}</div>
          </div>
          <div style={styles.statusIndicator}>
            <span style={styles.statusDot} />
            <span style={styles.statusText}>System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: "var(--primary-gradient)",
    padding: "1rem 1.5rem", // Reduced padding to make the header less tall
    boxShadow: "var(--shadow-lg)",
    position: "relative" as "relative", // Fixed TypeScript error by explicitly casting the type
    top: "auto", // Reset top positioning
    zIndex: "auto", // Reset z-index
    width: "100vw", // Full width of the viewport
    left: 0, // Aligns the header to the left edge
    margin: 0, // Removes any default margin
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  logoIconContainer: {
    width: "3.5rem",
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    border: "2px solid rgba(255,255,255,0.3)",
  },
  logoIcon: {
    fontSize: "2rem",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.25rem",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem", // Slightly smaller title font
    fontWeight: 600,
    color: "white",
    letterSpacing: "0.5px",
  },
  subtitle: {
    fontSize: "0.9rem", // Slightly smaller subtitle font
    color: "rgba(255,255,255,0.8)",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
  },
  dateTimeContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end",
    gap: "0.75rem",
  },
  timeContainer: {
    textAlign: "right" as const,
  },
  time: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "white",
    letterSpacing: "1px",
  },
  date: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.8)",
    marginTop: "0.25rem",
  },
  statusIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "rgba(255,255,255,0.15)",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "var(--success)",
    boxShadow: "0 0 8px var(--success)",
  },
  statusText: {
    fontSize: "0.9rem",
    color: "white",
    fontWeight: 500,
    letterSpacing: "0.5px",
  },
};

export default Header;
