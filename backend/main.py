from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
import models
import schemas
from database import SessionLocal, engine
from auth import hash_password, verify_password, create_token, SECRET_KEY, ALGORITHM

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = hash_password(user.password)
    new_user = models.User(name=user.name, email=user.email, password=hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_token(user.id)
    return {"access_token": token, "token_type": "bearer"}

@app.get("/profile")
def profile(user=Depends(get_current_user)):
    return {"name": user.name, "email": user.email}

@app.post("/tasks")
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    new_task = models.Task(title=task.title, description=task.description, user_id=user.id)
    db.add(new_task)
    db.commit()
    return {"message": "Task added"}

@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(models.Task).filter(models.Task.user_id == user.id).all()

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == user.id
    ).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"message": "Deleted"}
