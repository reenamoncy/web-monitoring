import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import ChartCard from "./components/ChartCard";
import ServerList from "./components/ServerList";
import {
  Server,
  fetchServers,
  fetchAlertCounts,
  fetchServerMetrics,
  fetchNetworkTraffic,
} from "./services/api"; // Use the Server type and import API functions

interface AlertCounts {
  critical: number;
  medium: number;
  low: number;
}

const App: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [alerts, setAlerts] = useState<AlertCounts>({
    critical: 0,
    medium: 0,
    low: 0,
  });
  const [resourceUsage, setResourceUsage] = useState<any[]>([]);
  const [networkTraffic, setNetworkTraffic] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serversData = await fetchServers();
        setServers(serversData);

        const alertCounts = await fetchAlertCounts();
        setAlerts(alertCounts);

        // Fetch resource usage and network traffic data from the API
        const serverMetrics = await fetchServerMetrics(serversData[0].id); // Example: Fetch metrics for the first server
        setResourceUsage(
          serverMetrics.timestamps.map((timestamp, index) => ({
            name: timestamp, // Updated to include 'name' field for ChartCard compatibility
            cpu: serverMetrics.cpu_usage[index],
            ram: serverMetrics.ram_usage[index],
            disk: serverMetrics.disk_usage[index],
          }))
        );

        const networkTrafficData = await fetchNetworkTraffic(serversData[0].id); // Example: Fetch network traffic for the first server
        setNetworkTraffic(
          networkTrafficData.timestamps.map((timestamp, index) => ({
            name: timestamp, // Updated to include 'name' field for ChartCard compatibility
            incoming: networkTrafficData.network_in[index],
          }))
        );
      } catch (e) {
        setError("Failed to fetch data from the API.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.content}>
        <StatsPanel alerts={alerts} />
        <section>
          <h2>Resource Monitoring</h2>
          <div style={styles.grid}>
            <ChartCard
              title="CPU Usage"
              type="line"
              data={resourceUsage}
              dataKey="cpu"
              color="#3498db"
            />
            <ChartCard
              title="RAM Usage"
              type="line"
              data={resourceUsage}
              dataKey="ram"
              color="#27ae60"
            />
            <ChartCard
              title="Disk Usage"
              type="bar"
              data={resourceUsage}
              dataKey="disk"
              color="#e74c3c"
            />
            <ChartCard
              title="Network Traffic"
              type="line"
              data={networkTraffic}
              dataKey="incoming"
              color="#9b59b6"
            />
          </div>
        </section>

        <section>
          <h2>Server Status</h2>
          <ServerList servers={servers} />
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "2rem",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1rem",
  },
};

export default App;
