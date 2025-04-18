from faker import Faker
from datetime import datetime, timedelta, timezone
import random
from sqlalchemy.orm import Session
from db import SessionLocal, engine
from models import Base, Server, ServerMetric, Alert, SeverityLevel

# Create database tables
Base.metadata.create_all(bind=engine)

fake = Faker()

def generate_mock_data():
    db = SessionLocal()
    try:
        # Generate servers
        servers = []
        for _ in range(5):
            server = Server(
                name=fake.company(),
                ip_address=fake.ipv4(),
                location=fake.city(),
                status=random.choice(["online", "offline", "maintenance"]),
                last_checked=datetime.now(timezone.utc)
            )
            db.add(server)
            servers.append(server)
        db.commit()

        # Generate metrics and alerts for each server
        for server in servers:
            # Generate metrics for the last 24 hours
            current_time = datetime.now(timezone.utc)
            for hours_ago in range(24):
                timestamp = current_time - timedelta(hours=hours_ago)
                
                # Generate server metrics
                metric = ServerMetric(
                    server_id=server.id,
                    timestamp=timestamp,
                    cpu_usage=random.uniform(0, 100),
                    ram_usage=random.uniform(0, 100),
                    disk_usage=random.uniform(0, 100),
                    application_usage=random.uniform(0, 100),
                    network_in=random.uniform(0, 1000)
                )
                db.add(metric)

                # Generate random alerts
                if random.random() < 0.1:  # 10% chance of alert
                    alert = Alert(
                        server_id=server.id,
                        timestamp=timestamp,
                        severity=random.choice(list(SeverityLevel)),
                        message=fake.sentence()
                    )
                    db.add(alert)

        db.commit()
        print("Mock data generated successfully!")

    except Exception as e:
        print(f"Error generating mock data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    generate_mock_data()