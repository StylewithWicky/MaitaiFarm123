from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database and Security
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Admin Credentials
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str
    
    # Cloudinary Settings
    CLOUDINARY_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    CLOUDINARY_URL: str 

    class Config:
        env_file = ".env"
        extra = "ignore" 


masettings = Settings()