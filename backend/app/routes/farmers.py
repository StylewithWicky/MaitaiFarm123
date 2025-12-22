from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from backend.app.database.connection import SessionLocal
from backend.app.models.farmers import Farmer

router=APIRouter(prefix='/farmers',tags=['Farmer'])

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/')
def get_farmer(db:Session=Depends(get_db)):
    farmer=db.query(Farmer).first()
    if not farmer:
        raise HTTPException(status_code=404,detail='Farmer not found')
    return farmer

@router.put('/')
def update_farmer(
    name:str,
    location:str,
    contact:str,
    description:str ='',
    db:Session =Depends(get_db)
):
    farmer=db.query(Farmer).first()
    if not farmer:
        raise HTTPException(status_code=404 ,detail="Farmer not found")
    
    farmer.name=name
    farmer.Location=location
    farmer.contact=contact
    farmer.description=description

    db.commit()
    db.refresh(farmer)

    return {'message':"farmer info updated", "data":farmer}