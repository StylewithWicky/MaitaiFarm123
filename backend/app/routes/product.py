from fastapi import APIRouter, Depends, HTTPException,Query
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

def product_filters(
    min_price: float | None = Query(None, ge=0),
    max_price: float | None = Query(None, ge=0),
    category: str | None = None,
):
    return {"min_price": min_price, "max_price": max_price, "category": category}

def get_product(db, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def buy_product(db, product_id: int, quantity: int):
    product = get_product(db, product_id)
    if quantity > product.stock:
        raise HTTPException(status_code=400, detail="Not enough stock")



@router.get("/products")
def list_products(
    filters: dict = Depends(product_filters),
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    query = db.query(Product)

    if filters["category"]:
        query = query.filter(Product.category == filters["category"])
    if filters["min_price"] is not None:
        query = query.filter(Product.price >= filters["min_price"])
    if filters["max_price"] is not None:
        query = query.filter(Product.price <= filters["max_price"])

    products = query.offset(offset).limit(limit).all()
    return products

@router.get("/products/sort")
def sorted_products(
    sort_by: str = Query("price"),
    order: str = Query("asc"),
    db: Session = Depends(get_db)
):
    valid_fields = {"price": Product.price, "date_added": Product.created_at}
    if sort_by not in valid_fields:
        raise HTTPException(status_code=400, detail="Invalid sort field")

    column = valid_fields[sort_by]
    query = db.query(Product).order_by(column.desc() if order == "desc" else column.asc())
    return query.all()
