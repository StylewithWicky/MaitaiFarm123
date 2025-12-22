from sqlmodel import SQLModel,Field
from datetime import datetime
from typing import Optional

class Payment(SQLModel,table=True):
    id:Optional[int]=Field(default=None,primary_key=True)
    phone:str
    amount:float
    checkout_request_id:Optional[str]=None
    merchant_request_id:Optional[str]=None
    status:str='pending'
    description:Optional[str]=None
    created_at:Field(default_factory=datetime.utcnow)
