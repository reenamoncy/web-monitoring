import React from "react";
import { Server } from "../services/api";

interface ServerListProps {
  servers: Server[];
}

const ServerList: React.FC<ServerListProps> = ({ servers }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#27ae60";
      case "warning":
        return "#f39c12";
      case "offline":
        return "#c0392b";
      default:
        return "#7f8c8d";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return "●";
      case "warning":
        return "⚠";
      case "offline":
        return "✕";
      default:
        return "○";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>IP Address</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr key={server.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.serverName}>{server.name}</div>
                </td>
                <td style={styles.td}>
                  <div style={styles.ipAddress}>{server.ip}</div>
                </td>
                <td style={styles.td}>
                  <div style={styles.location}>
                    <span style={styles.locationIcon}>📍</span>
                    {server.location}
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.statusContainer}>
                    <span
                      style={{
                        ...styles.statusDot,
                        backgroundColor: getStatusColor(server.status),
                      }}
                    >
                      {getStatusIcon(server.status)}
                    </span>
                    <span
                      style={{
                        ...styles.status,
                        color: getStatusColor(server.status),
                      }}
                    >
                      {server.status.toUpperCase()}
                    </span>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.timestamp}>{server.lastUpdated}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "2rem",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
    },
  },
  tableContainer: {
    overflowX: "auto" as const,
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate" as const,
    borderSpacing: 0,
  },
  tr: {
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  th: {
    textAlign: "left" as const,
    padding: "1rem",
    borderBottom: "2px solid #ecf0f1",
    color: "#7f8c8d",
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #ecf0f1",
    verticalAlign: "middle" as const,
  },
  serverName: {
    fontWeight: 500,
    fontSize: "1rem",
    color: "#2c3e50",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  statusDot: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    color: "white",
    fontSize: "0.8rem",
  },
  status: {
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "0.8rem",
    fontWeight: 600,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  ipAddress: {
    fontFamily: "monospace",
    fontSize: "0.9rem",
    color: "#2c3e50",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#2c3e50",
  },
  locationIcon: {
    fontSize: "1rem",
  },
  timestamp: {
    fontSize: "0.85rem",
    color: "#7f8c8d",
  },
};

export default ServerList;
