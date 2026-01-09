from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.deps import get_db
from app.models.farmers import Farmer
from app.schema.farmers import FarmerCreate, FarmerResponse

router = APIRouter(prefix="/farmers", tags=["Farmers"])

@router.post("/", response_model=FarmerResponse)
def create_farmer(data: FarmerCreate, db: Session = Depends(get_db)):
    farmer = Farmer(**data.dict())
    db.add(farmer)
    db.commit()
    db.refresh(farmer)
    return farmer

@router.get("/", response_model=list[FarmerResponse])
def get_farmers(db: Session = Depends(get_db)):
    return db.query(Farmer).all()

@router.get("/{farmer_id}", response_model=FarmerResponse)
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).get(farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer
