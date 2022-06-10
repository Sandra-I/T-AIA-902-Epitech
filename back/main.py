from typing import Union

from fastapi import FastAPI

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


@app.get("/endpoint")
def read_item():
    # params en body
    return {"item_id"}