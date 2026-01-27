import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database.deps import get_db
from app.models import Product
from app.config import masettings

router = APIRouter()

cloudinary.config(
    cloud_name=masettings.CLOUDINARY_NAME,
    api_key=masettings.CLOUDINARY_API_KEY,
    api_secret=masettings.CLOUDINARY_API_SECRET,
    secure=True
)

@router.post("/farmer/{farmer_id}")
async def create_product(
    farmer_id: int,
    name: str = Form(...),
    price: float = Form(...),
    description: Optional[str] = Form(None),
    category: str = Form(...),
    stock: int = Form(0),
    breed: Optional[str] = Form(None),
    sex: Optional[str] = Form(None),
    dob: Optional[str] = Form(None),
    reg_no: Optional[str] = Form(None),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    image_url = None

    if file:
        try:
            upload_result = cloudinary.uploader.upload(file.file)
            image_url = upload_result.get("secure_url")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(e)}")

    new_product = Product(
        name=name,
        price=price,
        description=description,
        category=category,
        stock=stock,
        breed=breed,
        sex=sex,
        dob=dob,
        reg_no=reg_no,
        image_url=image_url,
        farmer_id=farmer_id
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    return new_product

@router.get("/")
def get_products(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Product)
    
    if category:
        # This solves the 'not being seen' issue by making the search case-insensitive
        query = query.filter(Product.category.ilike(category))
        
    products = query.all()
    return products

@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
@router.put("/{product_id}")
def update_product(product_id: int, updated_data: dict, db: Session = Depends(get_db)):
    # 1. Find the product in the database
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

  
    for key, value in updated_data.items():
        if hasattr(product, key):
            setattr(product, key, value)

    
    db.commit()
    db.refresh(product)
    
    return product
@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}