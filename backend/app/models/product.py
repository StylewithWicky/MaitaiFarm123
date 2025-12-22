from sqlalchemy import Table,Column,Integer,String,Float,ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base

class Product(Base):

    __tablename__='product'
    
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String(100),nullable=False)
    price=Column(Float,nullable=False)
    farmer_id=Column(Integer,ForeignKey('farmer.id'))

    farmer =relationship('Farmer', back_populates='products')

