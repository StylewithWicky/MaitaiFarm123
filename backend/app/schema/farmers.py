from pydantic import BaseModel
from typing import List
from app.schema.product import ProductResponse

class FarmerCreate(BaseModel):
    name: str
    location: str

class FarmerResponse(FarmerCreate):
    id: int
    products: List[ProductResponse] = []

    class Config:
        from_attributes = True
