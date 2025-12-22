from sqlalchemy import Table,Column,Integer,String,Float,ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database.connection import Base, engine


class Farmer(Base):
    __tablename__='farmer'
    id = Column(Integer,primary_key=True)
    name =Column(String(100),nullable=True)
    Location =Column(String(100),nullable=True)

    products=relationship ('Products', back_populates="farmer",cascade="all ,delete-orphan")

