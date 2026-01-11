import hashlib
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "bajrang_secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 6

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain: str, hashed: str) -> bool:
    return hash_password(plain) == hashed

def create_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
