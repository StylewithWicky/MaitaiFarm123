from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from backend.app.database.connection import SessionLocal
from backend.app.models.product import Product
from backend.app.models.farmers import Farmer

router=APIRouter(prefix="/products", tags=['Products'])

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/')
def get_products(db:Session =Depends(get_db)):
    return db.query(Product).all()

@router.get("/{product_id}")
def get_product(product_id:int ,db:Session =Depends(get_db)):
    product=db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404 ,detail="Product not found")
    return product

@router.post('/')
def create_product(
    name: str,
    price:float,
    description:str ="",
    image_url:str ="",
    db:Session=Depends(get_db)
):
    farmer=db.query(Farmer).first()
    if not farmer:
        raise HTTPException(status_code=404 ,detail="No farmer record found ")
    
    product =Product(
        name=name,
        price=price,
        description=description,
        image_url=image_url,
        farmer_id=farmer.id
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return{'message':'Product added successfully','data':product}

@router.put('/{product_id}')
def update_product(
    product_id:int,
    name:str =None,
    price:float = None,
    description:str=None,
    image_url:str =None,
    db:Session=Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if name:
        product.name = name
    if price:
        product.price = price
    if description:
        product.description = description
    if image_url:
        product.image_url = image_url

    db.commit()
    db.refresh(product)
    return {"message": "Product updated successfully", "data": product}


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}
    
