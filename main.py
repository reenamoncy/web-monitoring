from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from routers.alerts import router as alerts_router
from routers.metrics import router as metrics_router
from routers.servers import router as servers_router

# Load environment variables
load_dotenv()

print("Starting FastAPI application...")

# Create FastAPI app
app = FastAPI(title="Server Monitoring Dashboard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://dashboard-323j.onrender.com",  # Deployed frontend domain
        "https://web-monitoring.onrender.com",
        "https://dashboard.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("CORS middleware configured.")

# Removed all backend logic and database connections
# Placeholder for future backend logic if needed

# Register routers
app.include_router(alerts_router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(metrics_router, prefix="/api/metrics", tags=["Metrics"])
app.include_router(servers_router, prefix="/api/servers", tags=["Servers"])

@app.get("/")
async def root():
    print("Root endpoint accessed.")
    return {"message": "Welcome to Server Monitoring Dashboard API"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            print(f"Received message: {data}")
            await websocket.send_text(f"Message received: {data}")
        except Exception as e:
            print(f"WebSocket connection error: {e}")
            break

print("FastAPI application setup complete.")

if __name__ == "__main__":
    import uvicorn
    try:
        port = int(os.environ.get("PORT", 8000))
        uvicorn.run("main:app", host="0.0.0.0", port=port, log_level="debug")
    except Exception as e:
        print(f"Error starting the server: {e}")
