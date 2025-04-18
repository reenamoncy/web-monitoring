from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from db import Base

class SeverityLevel(enum.Enum):
    CRITICAL = "critical"
    MEDIUM = "medium"
    LOW = "low"

class Server(Base):
    __tablename__ = "servers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    ip_address = Column(String)
    location = Column(String)
    status = Column(String)  # online, offline, maintenance
    last_checked = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    metrics = relationship("ServerMetric", back_populates="server")
    alerts = relationship("Alert", back_populates="server")

class ServerMetric(Base):
    __tablename__ = "server_metrics"

    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    cpu_usage = Column(Float)
    ram_usage = Column(Float)
    disk_usage = Column(Float)
    application_usage = Column(Float)
    network_in = Column(Float)  # Network traffic in MB/s
    
    # Relationship
    server = relationship("Server", back_populates="metrics")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    server_id = Column(Integer, ForeignKey("servers.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    severity = Column(Enum(SeverityLevel))
    message = Column(String)
    
    # Relationship
    server = relationship("Server", back_populates="alerts")