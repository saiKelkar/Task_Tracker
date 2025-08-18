from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func

from database import Base

class Tasks(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    taskHead = Column(String, index=True, nullable=False)
    taskBody = Column(String, nullable=False)
    tags = Column(
        Enum('to_do', 'in_progress', 'done', name='task_progress'), 
        nullable=False
    )

    createdAt = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=True
    )
    updatedAt = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now(), 
        nullable=True
    )