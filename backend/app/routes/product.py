from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.deps import get_db
from app.models.product import Product
from app.models.farmers import Farmer
from app.schema.product import ProductCreate, ProductResponse

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/farmer/{farmer_id}", response_model=ProductResponse)
def create_product(
    farmer_id: int,
    data: ProductCreate,
    db: Session = Depends(get_db)
):
    farmer = db.query(Farmer).get(farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    product = Product(**data.dict(), farmer=farmer)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.get("/", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()
