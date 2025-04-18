from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from db import get_db
from models import Server
from schemas import Server as ServerSchema

print("Initializing servers router...")

router = APIRouter()

@router.get("/", response_model=List[ServerSchema])
def get_servers(db: Session = Depends(get_db)):
    """
    Get a list of all servers with their details
    """
    try:
        print("Fetching servers from the database...")
        servers = db.query(Server).all()
        print(f"Fetched servers: {servers}")
        # Serialize the SQLAlchemy objects into dictionaries
        return [ServerSchema.from_orm(server) for server in servers]
    except Exception as e:
        print(f"Error fetching servers: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/{server_id}", response_model=ServerSchema)
def get_server(server_id: int, db: Session = Depends(get_db)):
    """
    Get details of a specific server
    """
    server = db.query(Server).filter(Server.id == server_id).first()
    if server is None:
        raise HTTPException(status_code=404, detail="Server not found")
    return server

print("Servers router initialized.")