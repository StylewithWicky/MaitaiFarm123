from fastapi import APIRouter, Depends, HTTPException, Response,Body
from sqlalchemy.orm import Session
from app.database.connection import SessionLocal
from app.models.user import User
from app.utils.security import hash_password, check_and_update_hash
from app.config import masettings
from jose import jwt
from app.schema.user import LoginRequest, RegisterRequest
from datetime import datetime, timedelta, timezone

router = APIRouter(prefix="/users", tags=['User'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/register')
def register_user( db: Session = Depends(get_db),request_data:RegisterRequest=Body(...)):
    existing_user = db.query(User).filter(User.email == request_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = hash_password(request_data.password)
    new_user = User(
        username=request_data.username, 
        email=request_data.email,
        password_hash=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {'message': 'User registered successfully', 'user-id': new_user.id}
    pass
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=masettings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, masettings.SECRET_KEY, algorithm=masettings.ALGORITHM)

@router.post('/login')
def login_user(response: Response, db: Session = Depends(get_db),request_data:LoginRequest=Body(...)):
    
    user = db.query(User).filter(User.email == request_data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    
    result = check_and_update_hash(request_data.password, user.password_hash)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    
    access_token = create_access_token({"sub": str(user.id), "role": user.role or "user"})

    
    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,
        secure=True, 
        samesite="None",
        max_age=masettings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/"
    )

    return {
        "message": "Login successful",
        
        "role": user.role or "user"
    }
    pass