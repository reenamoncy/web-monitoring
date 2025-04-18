import psycopg2
from dotenv import load_dotenv
import os
from db import SessionLocal
from models import Server

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/server_monitoring")

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

if __name__ == "__main__":
    inspect_servers_table()