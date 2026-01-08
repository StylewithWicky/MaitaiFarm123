from sqlalchemy import Table,Column,Integer,String,Float,ForeignKey
from sqlalchemy.orm import relationship
from ..database.connection import Base, engine


class Farmer(Base):
    __tablename__='farmers'
    id = Column(Integer,primary_key=True)
    name =Column(String(100),nullable=True)
    location =Column(String(100),nullable=True)

    products=relationship ('Product',back_populates="farmer",cascade="all,delete-orphan")

