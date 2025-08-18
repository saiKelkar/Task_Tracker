from database import Base, engine
from models import Tasks

Base.metadata.create_all(bind=engine)
print("Tables creates")