import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import cloudinary.uploader
from app.database.deps import get_db
from app.models.product import Product
from app.models.farmers import Farmer

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/farmer/{farmer_id}")
async def create_product(
    farmer_id: int,
    name: str = Form(...),
    price: float = Form(...),
    category: str = Form(None),
    description: str = Form(None),
    stock: int = Form(0),
    breed: str = Form(None),
    sex: str = Form(None),
    dob: str = Form(None),
    reg_no: str = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    try:
        upload_result = cloudinary.uploader.upload(image.file)
        image_url = upload_result.get("secure_url")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    product = Product(
        name=name,
        price=price,
        description=description,
        stock=stock,
        breed=breed,
        sex=sex,
        dob=dob,
        reg_no=reg_no,
        farmer_id=farmer_id,
        image_url=image_url
    )

    if not category:
        name_lower = name.lower()
        if "hive" in name_lower:
            product.category = "Hives"
        elif "honey" in name_lower:
            product.category = "Honey"
        elif "dorper" in name_lower or "sheep" in name_lower:
            product.category = "Livestock"
        elif "k9" in name_lower or "dog" in name_lower:
            product.category = "Dogs"
        else:
            product.category = "General"
    else:
        normalized = category.strip().lower()
        if normalized in {"k9", "dog", "dogs"}:
            product.category = "Dogs"
        else:
            product.category = category.strip().title()

    try:
        db.add(product)
        db.commit()
        db.refresh(product)
        return product
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to save product")

@router.get("/")
def list_products(category: str = None, db: Session = Depends(get_db)):
    query = db.query(Product)
    if category:
        cat = category.strip().lower()
        if cat in {"k9", "dog", "dogs"}:
            cat = "dogs"
        from sqlalchemy import func
        query = query.filter(func.lower(Product.category) == cat)
    return {"products": query.all()}

@router.get("/detail/{product_id}")
def get_product_detail(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"status": "success", "message": "Item deleted"}