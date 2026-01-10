from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker,declarative_base 
from dotenv import load_dotenv 
import os
from pathlib import Path



BASE_DIR = Path(__file__).resolve().parents[3]
 
ENV_PATH = BASE_DIR / ".env"


if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)
else:
    raise FileNotFoundError(f".env file not found at {ENV_PATH}")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError('DATABASE_URL environment variable not set')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base=declarative_base()