from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import gym
import random
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def run_algorithm(params):
    env = gym.make("Taxi-v3")

    action_space_size = env.action_space.n
    state_space_size = env.observation_space.n
    q_table = np.zeros((state_space_size, action_space_size))

    nb_episodes = params.nb_episodes
    max_steps_per_episode = params.max_steps_per_episode
    learning_rate = params.learning_rate
    discount_rate = params.discount_rate
    exploration_rate = params.exploration_rate
    max_exploration_rate = params.max_exploration_rate
    min_exploration_rate = params.min_exploration_rate
    exploration_decay_rate = params.exploration_decay_rate

    rewards_all_episodes = []

    for episode in range(nb_episodes):
        state = env.reset()
        rewards_current_episode = 0

        for step in range(max_steps_per_episode):
            if random.uniform(0, 1) > exploration_rate:
                action = np.argmax(q_table[state, :])
            else:
                action = env.action_space.sample()

            new_state, reward, done, info = env.step(action)

            q_table[state, action] = q_table[state, action] * (1 - learning_rate) + learning_rate * (
                reward + discount_rate * np.max(q_table[new_state, :]))
            state = new_state
            rewards_current_episode += reward

            if done == True:
                break
        exploration_rate = min_exploration_rate + \
            (max_exploration_rate - min_exploration_rate) * \
            np.exp(-exploration_decay_rate*episode)
        rewards_all_episodes.append(rewards_current_episode)
    cut_nb_episodes = nb_episodes - nb_episodes % 1000
    rewards_per_thousand_episodes = rewards_all_episodes[0:cut_nb_episodes]
    rewards_per_thousand_episodes = np.split(
        np.array(rewards_per_thousand_episodes), cut_nb_episodes/1000)
    average_rewards = [rewards_all_episodes[0]]
    for r in rewards_per_thousand_episodes:
        average_rewards.append(sum(r/1000))
    if(cut_nb_episodes != nb_episodes):
      average_rewards.append(sum(np.array(rewards_all_episodes[cut_nb_episodes:nb_episodes])/1000))
    return average_rewards


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
def endpoint(params: Params):
    return run_algorithm(params)
