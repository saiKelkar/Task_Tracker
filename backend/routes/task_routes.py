from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import schema
from schema import TaskProgress
from database import get_db
from controllers import task_controllers

router = APIRouter(prefix="/tasks", tags=["Tasks"])

# Get all tasks
@router.get("/", response_model=list[schema.TaskResponse])
def getTask(db:Session=Depends(get_db)):
    return task_controllers.get_all_tasks(db)

# Get tasks by tag
@router.get("/tags/{tags}", response_model=list[schema.TaskResponse])
def getTaskByTags(tag:TaskProgress, db:Session=Depends(get_db)):
    return task_controllers.get_tasks_by_tags(tag, db)

# Get tasks by ID
@router.get("/{id}", response_model=schema.TaskResponse)
def getTaskById(id:int, db:Session=Depends(get_db)):
    return task_controllers.get_tasks_by_id(id, db)

# Create task
@router.post("/", response_model=schema.TaskResponse)
def createTask(task:schema.TaskCreate, db:Session=Depends(get_db)):
    return task_controllers.create_task(task, db)

# Update task
@router.put("/{id}", response_model=schema.TaskResponse)
def updateTask(id:int, task:schema.TaskCreate, db:Session=Depends(get_db)):
    return task_controllers.update_task(id, task, db)

# Delete task
@router.delete("/{id}")
def deleteTask(id:int, db:Session=Depends(get_db)):
    return task_controllers.delete_task(id, db)