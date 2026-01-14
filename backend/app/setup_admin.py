from app.database.connection import SessionLocal
from app.models.user import User
from app.utils.security import hash_password
import os
from dotenv import load_dotenv
from pathlib import Path

db = SessionLocal()
BASE_DIR = Path(__file__).resolve().parents[3]
ENV_PATH = BASE_DIR / ".env"


load_dotenv(dotenv_path=ENV_PATH)

def create_admin():

    email = os.getenv("ADMIN_EMAIL")

    password = os.getenv("ADMIN_PASSWORD") 

    if not email or not password:
        print("Error: ADMIN_EMAIL or ADMIN_PASSWORD not found in .env file")
        return

    user = db.query(User).filter(User.email == email).first()

    if not user:
        user = User(
            username="MaitaiBoss",
            email=email,
            password_hash=hash_password(password), 
            role="admin"
        )
        db.add(user)
        print(f"New Admin created with email: {email}")
    else:
        user.password_hash = hash_password(password)
        user.role = "admin"
        print(f"User {email} promoted to Admin and password updated!")

    db.commit()
    db.close()

if __name__ == "__main__":
    create_admin()