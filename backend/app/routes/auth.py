from fastapi import APIRouter,Depends,HTTPException,Response
from sqlalchemy.orm import Session
from app.database.connection import SessionLocal
from app.models.user import User
from app.utils.security import hash_password,check_and_update_hash
from app.config import masettings
from jose import jwt


router=APIRouter(prefix="/users", tags=['User'])



def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/register')
def register_user(username:str,email:str,password:str,role:str,db:Session=Depends(get_db)):
    existing_user=db.query(User).filter(User.email==email).first()
    if existing_user:
        raise HTTPException(status_code=400,detail="Email already registered")
    
    hashed_pw=hash_password(password)

    new_user=User(username=username,
                  email=email,
                  hashed_password=hashed_pw, 
                  role=role
                  )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return{'message':'User registered successfully','user-id':new_user.id}

def create_access_token(data: dict, expires_in: int = masettings.ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_in)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, masettings.SECRET_KEY, algorithm=masettings.ALGORITHM)

@router.post('/login')
def login_user(response:Response,email:str,password:str,db:Session=Depends(get_db)):
    user=db.query(User).filter(User.email==email).first()
    if not user:
        raise HTTPException(status_code=401,detail="Invalid credentials")
    new_hash=check_and_update_hash(password,user.hashed_password)
    if new_hash !=user.hashed_password:
        user.hashed_password=new_hash
        db.commit()


    return {'message':f'Welcome {user.username}'}

@router.post('/login')
def login_user(response: Response, email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    
    new_hash = check_and_update_hash(password, user.hashed_password)
    if new_hash != user.hashed_password:
        user.hashed_password = new_hash
        db.commit()

    
    access_token = create_access_token({"sub": str(user.id), "role": user.role})

   
    response.set_cookie(
        key="token",
        value=access_token,
        httponly=True,
        secure=False,          
        samesite="Lax",
        max_age=masettings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/"
    )

    return {"message": f"Welcome {user.username}"}
