from fastapi import APIRouter, Depends, HTTPException,Query
from sqlalchemy.orm import Session
from app.database.deps import get_db
from app.models.product import Product
from app.models.farmers import Farmer
from app.schema.product import ProductCreate, ProductResponse

router = APIRouter(prefix="/products", tags=["Products"])

def product_filters(
    min_price: float | None = Query(None, ge=0),
    max_price: float | None = Query(None, ge=0),
    category: str | None = None,
):
    return {"min_price": min_price, "max_price": max_price, "category": category}

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

@router.get("/", response_model=dict)
def list_products(
    filters: dict = Depends(product_filters),
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    sort_by: str = Query("price"),
    order: str = Query("asc"),
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

    if sort_by in ["price", "date_added"]:
        column = getattr(Product, sort_by)
        products.sort(key=lambda x: getattr(x, sort_by), reverse=(order == "desc"))

    return {"products": products, "total": query.count(), "limit": limit, "offset": offset}




