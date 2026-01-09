from pydantic import BaseModel, EmailStr
from typing import Optional



class UserBase(BaseModel):
    username: str
    email: EmailStr



class UserCreate(UserBase):
    password: str   


class UserLogin(BaseModel):
    username: str
    password: str



class UserRead(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True
