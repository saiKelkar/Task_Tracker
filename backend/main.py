from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import task_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return { "message": "API running" }

app.include_router(task_routes.router)