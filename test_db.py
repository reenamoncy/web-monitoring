import psycopg2
from dotenv import load_dotenv
import os
from db import SessionLocal
from models import Server, Alert, ServerMetric

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

try:
    # Connect to the database
    conn = psycopg2.connect(DATABASE_URL)
    print("Successfully connected to the database!")
    
    # Create a cursor
    cur = conn.cursor()
    
    # Execute a simple query
    cur.execute("SELECT version();")
    version = cur.fetchone()
    print(f"PostgreSQL version: {version[0]}")
    
    # Close cursor and connection
    cur.close()
    conn.close()
    print("Database connection closed.")
    
except Exception as e:
    print(f"Error connecting to the database: {e}")

def inspect_servers_table():
    db = SessionLocal()
    try:
        servers = db.query(Server).all()
        for server in servers:
            print(f"ID: {server.id}, Name: {server.name}, Last Checked: {server.last_checked}")
    except Exception as e:
        print(f"Error inspecting servers table: {e}")
    finally:
        db.close()

def inspect_alerts_table():
    db = SessionLocal()
    try:
        alerts = db.query(Alert).all()
        if not alerts:
            print("No alerts found in the database.")
        for alert in alerts:
            print(f"ID: {alert.id}, Server ID: {alert.server_id}, Severity: {alert.severity}, Message: {alert.message}, Timestamp: {alert.timestamp}")
    except Exception as e:
        print(f"Error inspecting alerts table: {e}")
    finally:
        db.close()

def inspect_server_metrics_table():
    db = SessionLocal()
    try:
        metrics = db.query(ServerMetric).all()
        if not metrics:
            print("No server metrics found in the database.")
        for metric in metrics:
            print(f"ID: {metric.id}, Server ID: {metric.server_id}, CPU Usage: {metric.cpu_usage}, RAM Usage: {metric.ram_usage}, Disk Usage: {metric.disk_usage}, Network In: {metric.network_in}, Timestamp: {metric.timestamp}")
    except Exception as e:
        print(f"Error inspecting server metrics table: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    inspect_servers_table()
    inspect_alerts_table()
    inspect_server_metrics_table()