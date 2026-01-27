from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from ..database.connection import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String(100), nullable=False, index=True)
    image_url = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    stock = Column(Integer, default=0, nullable=False)
    breed = Column(String, nullable=True)
    sex = Column(String, nullable=True)
    dob = Column(String, nullable=True)
    reg_no = Column(String, nullable=True)

    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    farmer = relationship("Farmer", back_populates="products")
