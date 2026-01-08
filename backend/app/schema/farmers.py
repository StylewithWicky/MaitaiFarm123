from pydantic import BaseModel

class PaymentRequest(BaseModel):
    phone:str
    amount:str