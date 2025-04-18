from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import SessionLocal, get_db
from models import ServerMetric

print("Initializing metrics router...")

router = APIRouter()

def test_db_connection():
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        print("Database connection successful in metrics router.")
    except Exception as e:
        print(f"Database connection failed in metrics router: {e}")
    finally:
        db.close()

test_db_connection()

@router.get("/server/{server_id}/metrics", tags=["Metrics"])
def get_server_metrics(server_id: int, db: Session = Depends(get_db)):
    # Query the database to fetch server metrics
    metrics = db.query(ServerMetric).filter(ServerMetric.server_id == server_id).all()

    # Transform the data into the required format
    response = {
        "timestamps": [metric.timestamp.isoformat() for metric in metrics],
        "cpu_usage": [metric.cpu_usage for metric in metrics],
        "ram_usage": [metric.ram_usage for metric in metrics],
        "disk_usage": [metric.disk_usage for metric in metrics],
        "application_usage": [metric.application_usage for metric in metrics],
    }

    return response

@router.get("/server/{server_id}/network", tags=["Metrics"])
def get_network_traffic(server_id: int, db: Session = Depends(get_db)):
    # Query the database to fetch network traffic data
    metrics = db.query(ServerMetric).filter(ServerMetric.server_id == server_id).all()

    # Transform the data into the required format
    response = {
        "timestamps": [metric.timestamp.isoformat() for metric in metrics],
        "network_in": [metric.network_in for metric in metrics],
    }

    return response

print("Metrics router initialized.")