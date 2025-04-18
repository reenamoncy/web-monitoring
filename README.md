# Server Monitoring Dashboard Backend

A FastAPI backend for a Server Monitoring Dashboard that provides endpoints for server metrics, alerts, and network traffic data.

## Features

- Server information endpoints
- Server metrics (CPU, RAM, Disk, Application usage)
- Network traffic monitoring
- Alert management with severity levels
- Mock data generation for testing

## Prerequisites

- Python 3.8+
- PostgreSQL

## Setup

1. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a PostgreSQL database named `server_monitoring`

4. Set up environment variables (optional):
   Create a `.env` file with:

```
DATABASE_URL=postgresql://username:password@localhost:5432/server_monitoring
```

5. Generate mock data:

```bash
python generate_mock_data.py
```

## Running the Application

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:

- Swagger UI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## API Endpoints

### Servers

- `GET /api/servers` - List all servers
- `GET /api/servers/{server_id}` - Get server details

### Metrics

- `GET /api/metrics/server/{server_id}/metrics` - Get server metrics
- `GET /api/metrics/server/{server_id}/network` - Get network traffic data

### Alerts

- `GET /api/alerts/counts` - Get alert counts by severity

## Query Parameters

- `hours`: Number of hours of historical data to retrieve (default: 24)
