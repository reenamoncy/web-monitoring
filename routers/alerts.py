from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from db import get_db
from models import Alert, SeverityLevel
from schemas import AlertCount

print("Initializing alerts router...")

router = APIRouter()

print("Alerts router initialized.")

@router.get("/counts", response_model=AlertCount)
def get_alert_counts(
    hours: int = 24,
    db: Session = Depends(get_db)
):
    """
    Get the count of alerts grouped by severity level for the last specified hours
    """
    try:
        print(f"Fetching alert counts for the last {hours} hours...")
        time_threshold = datetime.utcnow() - timedelta(hours=hours)
        
        # Query to count alerts by severity
        alert_counts = db.query(
            Alert.severity,
            func.count(Alert.id).label('count')
        ).filter(
            Alert.timestamp >= time_threshold
        ).group_by(Alert.severity).all()
        
        # Initialize counts dictionary
        counts = {
            SeverityLevel.CRITICAL: 0,
            SeverityLevel.MEDIUM: 0,
            SeverityLevel.LOW: 0
        }
        
        # Update counts from query results
        for severity, count in alert_counts:
            counts[severity] = count
        
        return AlertCount(
            critical=counts[SeverityLevel.CRITICAL],
            medium=counts[SeverityLevel.MEDIUM],
            low=counts[SeverityLevel.LOW]
        )
    except Exception as e:
        print(f"Error fetching alert counts: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")