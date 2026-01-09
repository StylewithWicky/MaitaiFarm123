from sqlalchemy import Table,Column,Integer,String,Float,ForeignKey
from sqlalchemy.orm import relationship
from ..database.connection import Base

class User(Base):
    
    __tablename__='User'

    id=Column(Integer,primary_key=True,index=True)
    username=Column(String(100),nullable=False,unique=True)
    email=Column(String(100),nullable=False,unique=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String, default='customer') 

    def  __repr__(self):
        return f"<User(username={self.username} ,role={self.role})"
