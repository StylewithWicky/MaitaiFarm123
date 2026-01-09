from pydantic import BaseModel,Field

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: str | None = Field(None, max_length=500)
    price: float = Field(..., gt=0)
    stock: int = Field(..., ge=0)
    category: str = Field(..., min_length=3)

class ProductResponse(ProductCreate):
    id: int
    farmer_id: int

    class Config:
        from_attributes = True
