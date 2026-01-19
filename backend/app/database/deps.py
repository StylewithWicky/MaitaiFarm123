from app.database.connection import SessionLocal
from sqlalchemy.orm import Session
from typing import Generator
from fastapi import Depends, HTTPException, status
from app.models.farmers import Farmer
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # SECRET_KEY and ALGORITHM should match your .env file
        payload = jwt.decode(token, "YOUR_SECRET_KEY", algorithms=["HS256"])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(Farmer).filter(Farmer.email == email).first()
    if user is None:
        raise credentials_exception
    return user
