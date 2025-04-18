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

interface ResourceUsage {
  name: string;
  cpu: number;
  ram: number;
  disk: number;
  app: number;
}

interface NetworkTraffic {
  name: string;
  incoming: number;
}

const App: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [alerts, setAlerts] = useState<AlertCounts>({
    critical: 0,
    medium: 0,
    low: 0,
  });
  const [resourceUsage, setResourceUsage] = useState<ResourceUsage[]>([]);
  const [networkTraffic, setNetworkTraffic] = useState<NetworkTraffic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading state to true before fetching data
        setLoading(true);

        const serversData = await fetchServers();
        setServers(serversData);

        const alertCounts = await fetchAlertCounts();
        setAlerts(alertCounts);

        if (serversData.length > 0) {
          // Fetch resource usage and network traffic data for the first server
          const serverMetrics = await fetchServerMetrics(serversData[0].id);
          const transformedMetrics = serverMetrics.timestamps.map((timestamp, index) => ({
            name: timestamp,
            cpu: serverMetrics.cpu_usage[index],
            ram: serverMetrics.ram_usage[index],
            disk: serverMetrics.disk_usage[index],
            app: serverMetrics.application_usage[index],
          }));
          setResourceUsage(transformedMetrics);

          const networkTrafficData = await fetchNetworkTraffic(serversData[0].id);
          setNetworkTraffic(
            networkTrafficData.timestamps.map((timestamp, index) => ({
              name: timestamp,
              incoming: networkTrafficData.network_in[index],
            }))
          );
        }

        // Set loading state to false after data fetching is complete
        setLoading(false);
      } catch (e) {
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return null; // Removed the loading state message
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  // Moved the filtering logic outside of JSX
  const filteredServers = servers.filter((server) => server.status === "online");

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
              data={resourceUsage.map((item) => ({ name: item.name, value: item.cpu }))}
              dataKey="value"
              color="#3498db"
            />
            <ChartCard
              title="RAM Usage"
              type="line"
              data={resourceUsage.map((item) => ({ name: item.name, value: item.ram }))}
              dataKey="value"
              color="#27ae60"
            />
            <ChartCard
              title="Disk Usage"
              type="line"
              data={resourceUsage.map((item) => ({ name: item.name, value: item.disk }))}
              dataKey="value"
              color="#e74c3c"
            />
            <ChartCard
              title="Application Usage"
              type="line"
              data={resourceUsage.map((item) => ({ name: item.name, value: item.app }))}
              dataKey="value"
              color="#9b59b6"
            />
          </div>
        </section>

        <section>
          <h2>Server Status</h2>
          {/* Pass only filtered servers to the ServerList component */}
          <ServerList servers={filteredServers} />
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
