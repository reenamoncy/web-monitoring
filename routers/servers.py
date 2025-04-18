from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import SessionLocal, get_db
from models import Server

print("Initializing servers router...")

router = APIRouter()

def test_db_connection():
    try:
        db = SessionLocal()
        db.execute("SELECT 1")
        print("Database connection successful in servers router.")
    except Exception as e:
        print(f"Database connection failed in servers router: {e}")
    finally:
        db.close()

test_db_connection()

@router.get("/", tags=["Servers"])
def list_servers(db: Session = Depends(get_db)):
    # Query the database to fetch the list of servers
    servers = db.query(Server).all()

    # Transform the data into the required format
    response = [
        {
            "id": server.id,
            "name": server.name,
            "ip": server.ip_address,
            "location": server.location,
            "status": server.status,
            "lastUpdated": server.last_checked.isoformat(),
        }
        for server in servers
    ]

    return response

# Removed all backend logic for servers
# Placeholder for future servers logic if needed

print("Servers router initialized.")