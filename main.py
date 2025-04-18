from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

print("Starting FastAPI application...")

# Create FastAPI app
app = FastAPI(title="Server Monitoring Dashboard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://web-monitoring.onrender.com",
        "https://dashboard.onrender.com"  # Added new origin
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("CORS middleware configured.")

# Import database configurations and dependency
from db import get_db, engine, Base

# Import and include routers
print("Importing routers...")
from routers import servers, metrics, alerts

print("Including routers...")
app.include_router(servers.router, prefix="/api/servers", tags=["servers"])
app.include_router(metrics.router, prefix="/api/metrics", tags=["metrics"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["alerts"])

@app.get("/")
async def root():
    print("Root endpoint accessed.")
    return {"message": "Welcome to Server Monitoring Dashboard API"}

print("FastAPI application setup complete.")

if __name__ == "__main__":
    import uvicorn
    try:
        port = int(os.environ.get("PORT", 8000))
        uvicorn.run("main:app", host="0.0.0.0", port=port, log_level="debug")
    except Exception as e:
        print(f"Error starting the server: {e}")
