from fastapi import FastAPI
from database import engine, SessionLocal, Base
from models import Tree
from fastapi.middleware.cors import CORSMiddleware
import json

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/trees")
def get_trees():
    db = SessionLocal()
    trees = db.query(Tree).all()
    return [{"id": t.id, "data": json.loads(t.data)} for t in trees]

@app.post("/trees")
def create_tree(tree: dict):
    db = SessionLocal()

    new_tree = Tree(
        data=json.dumps(tree)
    )

    db.add(new_tree)
    db.commit()

    return {"message": "Saved"}

@app.put("/trees/{tree_id}")
def update_tree(tree_id: int, tree: dict):
    db = SessionLocal()

    t = db.query(Tree).filter(
        Tree.id == tree_id
    ).first()

    t.data = json.dumps(tree)

    db.commit()

    return {"message": "Updated"}