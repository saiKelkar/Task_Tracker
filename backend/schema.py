from pydantic import BaseModel
from enum import Enum
from datetime import datetime
from typing import Optional

# Tasks
class TaskProgress(str, Enum):
    to_do = "to_do"
    in_progress = "in_progress"
    done = "done"

class TaskCreate(BaseModel):
    taskHead: str
    taskBody: str
    tags: TaskProgress

class TaskResponse(TaskCreate):
    id: int
    createdAt: Optional[datetime]
    updatedAt: Optional[datetime]

    class Config:
        from_attributes = True