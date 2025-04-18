import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Updated to point to the local backend for development

export interface AlertCounts {
  critical: number;
  medium: number;
  low: number;
}

export interface Server {
  id: number;
  name: string;
  ip: string; // Updated property name from ip_address to ip
  location: string;
  status: string; // online, offline, maintenance
  lastUpdated: string; // Updated property name from last_checked to lastUpdated
}

export interface ServerMetricsResponse {
  timestamps: string[];
  cpu_usage: number[];
  ram_usage: number[];
  disk_usage: number[];
  application_usage: number[];
}

export interface NetworkTrafficResponse {
  timestamps: string[];
  network_in: number[];
}

export const fetchAlertCounts = async (): Promise<AlertCounts> => {
  try {
    const response = await axios.get<AlertCounts>(
      `${API_BASE_URL}/alerts/counts`
    );
    console.log("Alert counts fetched successfully:", response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error("Error fetching alert counts:", error); // Simplified error logging
    throw error;
  }
};

export const fetchServers = async (): Promise<Server[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/servers`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Servers fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching servers:", error);
    throw error;
  }
};

export const fetchServerMetrics = async (
  serverId: number,
  hours: number = 24
): Promise<ServerMetricsResponse> => {
  try {
    const response = await axios.get<ServerMetricsResponse>(
      `${API_BASE_URL}/metrics/server/${serverId}/metrics`,
      {
        params: { hours },
      }
    );
    console.log("Server metrics fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching server metrics:", error);
    throw error;
  }
};

export const fetchNetworkTraffic = async (
  serverId: number,
  hours: number = 24
): Promise<NetworkTrafficResponse> => {
  try {
    const response = await axios.get<NetworkTrafficResponse>(
      `${API_BASE_URL}/metrics/server/${serverId}/network`, // Updated to include /metrics prefix
      {
        params: { hours },
      }
    );
    console.log("Network traffic fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching network traffic:", error);
    throw error;
  }
};
