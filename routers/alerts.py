from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import SessionLocal, get_db
from models import Alert, SeverityLevel

print("Initializing alerts router...")

router = APIRouter()

print("Alerts router initialized.")

def test_db_connection():
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        print("Database connection successful in alerts router.")
    except Exception as e:
        print(f"Database connection failed in alerts router: {e}")
    finally:
        db.close()

test_db_connection()

@router.get("/counts", tags=["Alerts"])
def get_alert_counts(db: Session = Depends(get_db)):
    # Query the database to count alerts by severity
    critical_count = db.query(Alert).filter(Alert.severity == SeverityLevel.CRITICAL).count()
    medium_count = db.query(Alert).filter(Alert.severity == SeverityLevel.MEDIUM).count()
    low_count = db.query(Alert).filter(Alert.severity == SeverityLevel.LOW).count()

    return {"critical": critical_count, "medium": medium_count, "low": low_count}

# Removed all backend logic for alerts
# Placeholder for future alerts logic if needed