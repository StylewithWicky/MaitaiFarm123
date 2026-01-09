
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.farmers import Farmer

def get_product(db: Session, product_id: int) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def buy_product(db: Session, product_id: int, quantity: int):
    product = get_product(db, product_id)
    if quantity > product.stock:
        raise HTTPException(status_code=400, detail="Not enough stock")
    product.stock -= quantity
    db.commit()
    db.refresh(product)
    return product

def create_product_for_farmer(db: Session, farmer_id: int, data):
    farmer = db.get(Farmer, farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    product = Product(**data.dict(), farmer=farmer)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

def query_products(db: Session, filters: dict, limit: int, offset: int, sort_by: str, order: str):
    query = db.query(Product)

    if filters.get("category"):
        query = query.filter(Product.category == filters["category"])
    if filters.get("min_price") is not None:
        query = query.filter(Product.price >= filters["min_price"])
    if filters.get("max_price") is not None:
        query = query.filter(Product.price <= filters["max_price"])

    valid_sort_fields = {"price": Product.price, "date_added": Product.created_at}
    if sort_by not in valid_sort_fields:
        raise HTTPException(status_code=400, detail="Invalid sort field")
    
    column = valid_sort_fields[sort_by]
    query = query.order_by(column.desc() if order == "desc" else column.asc())

    total = query.count()
    products = query.offset(offset).limit(limit).all()
    return {"total": total, "products": products}
