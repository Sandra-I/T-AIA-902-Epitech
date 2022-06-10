from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Params(BaseModel):
    nb_episodes: int
    max_steps_per_episode: int
    learning_rate: float
    discount_rate: float
    exploration_rate: int
    max_exploration_rate: int
    min_exploration_rate: float
    exploration_decay_rate: float

@app.get("/")
def read_root():
    return {"Hello AI World"}

@app.post("/endpoint")
def endpoint(params : Params):
    return params
