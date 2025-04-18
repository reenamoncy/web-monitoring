from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from models import SeverityLevel

class ServerBase(BaseModel):
    name: str
    ip_address: str
    location: str
    status: str

class ServerCreate(ServerBase):
    pass

class Server(ServerBase):
    id: int
    last_checked: datetime

    class Config:
        from_attributes = True
        orm_mode = True

class ServerMetricBase(BaseModel):
    cpu_usage: float
    ram_usage: float
    disk_usage: float
    application_usage: float
    network_in: float

class ServerMetricCreate(ServerMetricBase):
    server_id: int

class ServerMetric(ServerMetricBase):
    id: int
    server_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    message: str
    severity: SeverityLevel

class AlertCreate(AlertBase):
    server_id: int

class Alert(AlertBase):
    id: int
    server_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class AlertCount(BaseModel):
    critical: int
    medium: int
    low: int

class ServerMetricsResponse(BaseModel):
    timestamps: List[datetime]
    cpu_usage: List[float]
    ram_usage: List[float]
    disk_usage: List[float]
    application_usage: List[float]

class NetworkTrafficResponse(BaseModel):
    timestamps: List[datetime]
    network_in: List[float]