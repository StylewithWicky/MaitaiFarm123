from fastapi import FastAPI
from app.database.connection import engine,Base
from app.models import farmers, product,user
from app.routes import farmers,product,auth
from fastapi.middleware.cors import CORSMiddleware



Base.metadata.create_all(bind=engine)

app = FastAPI(title="Maitai Farm API", version="1.0")

origins = [
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(farmers.router)
app.include_router(product.router)
app.include_router(auth.router)
                   
@app.get("/")
def home():
    return {"message": "Gwan to Maitai Dorper Farm API 🌾"}
