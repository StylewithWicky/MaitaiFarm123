from app.database.connection import SessionLocal
from sqlalchemy.orm import Session
from typing import Generator

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
