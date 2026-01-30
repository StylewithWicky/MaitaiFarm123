import os
import cloudinary
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

from app.database.connection import engine, Base
from app.models import farmers, product, user
from app.routes import farmers as farmer_routes, product as product_routes, auth as auth_routes

Base.metadata.create_all(bind=engine)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

app = FastAPI(title="Maitai Farm API", version="1.0")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://maitai-farm.vercel.app",
    "https://maitai-farm123.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(farmer_routes.router)
app.include_router(product_routes.router, prefix="/products", tags=["products"])
app.include_router(auth_routes.router)

@app.get("/")
def home():
    return {"message": "Gwan to Maitai Dorper Farm API 🌾"}

class ContactInquiry(BaseModel):
    name: str
    phone: str
    interest: str
    message: str

@app.post("/api/contact")
async def handle_contact(inquiry: ContactInquiry):
    print(f"New Inquiry from {inquiry.name} regarding {inquiry.interest}")
    return {"status": "success", "message": "Maitai Farm has received your inquiry!"}