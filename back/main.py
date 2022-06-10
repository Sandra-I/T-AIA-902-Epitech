from typing import Union

from fastapi import FastAPI, Request

app = FastAPI()

# nb_episodes = 10000
# max_steps_per_episode = 100

# learning_rate = 0.81
# discount_rate = 0.96

# exploration_rate = 1
# max_exploration_rate = 1
# min_exploration_rate = 0.01
# exploration_decay_rate = 0.01

@app.get("/")
def read_root():
    return {"Hello AI World"}


@app.post("/endpoint")
async def read_item(params: Request):
    req_params = await params.json()
    return req_params