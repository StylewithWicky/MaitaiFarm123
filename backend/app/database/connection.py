from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker,declarative_base 
from dotenv import load_dotenv 
import os

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env")
load_dotenv(dotenv_path)


DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError('DATABASE_URL environment variable not set')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

Base=declarative_base()