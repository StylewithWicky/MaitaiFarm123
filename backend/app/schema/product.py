from pydantic import BaseModel, Field
from typing import Optional

class ProductBase(BaseModel):
    name: str
    price: float
    category: str
    stock: int = 0
    description: Optional[str] = None
    breed: Optional[str] = None
    sex: Optional[str] = None
    dob: Optional[str] = None
    reg_no: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    farmer_id: int

    class Config:
        from_attributes = True 
