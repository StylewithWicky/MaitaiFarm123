from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import text, func
from typing import List

# Import your local modules
from app.database.deps import get_db
from app.models.product import Product
from app.models.farmers import Farmer
from app.schema.product import ProductCreate, ProductResponse

router = APIRouter(prefix="/products", tags=["Products"])

# --- 1. CREATE PRODUCT (Handles K9, Dorper, Hives, Honey) ---
@router.post("/farmer/{farmer_id}", response_model=ProductResponse)
def create_product(farmer_id: int, data: ProductCreate, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    product = Product()
    incoming_data = data.dict()

    # Map incoming fields onto the SQLAlchemy model
    for key, value in incoming_data.items():
        setattr(product, key, value)

    # Normalize category input (if provided)
    cat_val = (getattr(product, "category", "") or "").strip()

    if not cat_val:
        # Auto-assign based on name
        name_lower = (product.name or "").lower()

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
        # If user typed a category, normalize it
        normalized = cat_val.lower()
        if normalized in {"k9", "dog", "dogs"}:
            product.category = "Dogs"
        else:
            # Optional: title-case, so "hives" -> "Hives"
            product.category = cat_val.title()

    product.farmer_id = farmer_id

    try:
        db.add(product)
        db.commit()
        db.refresh(product)
        return product
    except Exception as e:
        db.rollback()
        print(f"❌ DB ERROR: {e}")
        raise HTTPException(status_code=500, detail="Failed to save product")

# --- 2. LIST PRODUCTS (The Case-Insensitive Filter) ---
@router.get("/")
def list_products(category: str = Query(None), db: Session = Depends(get_db)):
    from sqlalchemy import text
    import inspect
    from sqlalchemy import func

    print("Product model loaded from:", inspect.getfile(Product))
    print("Has Product.category?", hasattr(Product, "category"))
    print("Mapped columns:", list(Product.__table__.c.keys()))
    
    query = db.query(Product)
    
    if category:
        
        cat = category.strip().lower()

        
        if cat in {"k9", "dog", "dogs"}:
            cat = "dogs"

        query = query.filter(func.lower(func.trim(Product.category)) == cat)
    
    try:
        products_data = query.all()
        print(f"🔍 SEARCH: '{category}' | Found: {len(products_data)} items")

        serialized = []
        for p in products_data:
            serialized.append({
                "id": p.id,
                "name": p.name,
                "price": p.price,
                # We use getattr with a default to prevent crashes if a field is missing
                "category": getattr(p, 'category', 'General'),
                "stock": getattr(p, 'stock', 0),
                "breed": getattr(p, 'breed', None),
                "sex": getattr(p, 'sex', None),
                "description": getattr(p, 'description', ''),
                "farmer_id": getattr(p, 'farmer_id', None)
            })
        
        return {"products": serialized}
    except Exception as e:
        print(f"❌ DATABASE ERROR: {e}")
        return {"products": [], "error": str(e)}
    

# --- 3. DELETE PRODUCT ---
@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"status": "success", "message": "Item deleted"}