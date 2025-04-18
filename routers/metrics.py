from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List

from db import get_db
from models import ServerMetric
from schemas import ServerMetricsResponse, NetworkTrafficResponse

print("Initializing metrics router...")

router = APIRouter()

@router.get("/server/{server_id}/metrics", response_model=ServerMetricsResponse)
def get_server_metrics(
    server_id: int,
    hours: int = 24,
    db: Session = Depends(get_db)
):
    """
    Get server metrics (CPU, RAM, Disk, Application usage) for the last specified hours
    """
    time_threshold = datetime.utcnow() - timedelta(hours=hours)
    
    metrics = db.query(ServerMetric).filter(
        ServerMetric.server_id == server_id,
        ServerMetric.timestamp >= time_threshold
    ).order_by(ServerMetric.timestamp).all()
    
    if not metrics:
        raise HTTPException(status_code=404, detail="No metrics found for this server")
    
    return ServerMetricsResponse(
        timestamps=[m.timestamp for m in metrics],
        cpu_usage=[m.cpu_usage for m in metrics],
        ram_usage=[m.ram_usage for m in metrics],
        disk_usage=[m.disk_usage for m in metrics],
        application_usage=[m.application_usage for m in metrics]
    )

@router.get("/server/{server_id}/network", response_model=NetworkTrafficResponse)
def get_network_traffic(
    server_id: int,
    hours: int = 24,
    db: Session = Depends(get_db)
):
    """
    Get network traffic data for the last specified hours
    """
    time_threshold = datetime.utcnow() - timedelta(hours=hours)
    
    metrics = db.query(ServerMetric).filter(
        ServerMetric.server_id == server_id,
        ServerMetric.timestamp >= time_threshold
    ).order_by(ServerMetric.timestamp).all()
    
    if not metrics:
        raise HTTPException(status_code=404, detail="No network traffic data found for this server")
    
    return NetworkTrafficResponse(
        timestamps=[m.timestamp for m in metrics],
        network_in=[m.network_in for m in metrics]
    )

print("Metrics router initialized.")