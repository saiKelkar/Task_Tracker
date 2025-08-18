import axios from "axios";
import type { TaskCreate, TaskResponse } from "./types";
import { TaskProgress } from "./types";

const API = axios.create({
    baseURL: "http://localhost:8000",
});

export const getTasks = () => 
    API.get<TaskResponse[]>("/tasks/");

export const getTaskById = (id:number) => 
    API.get<TaskResponse>(`/tasks/${id}`);

export const getTasksByTag = (tag:TaskProgress) =>
    API.get<TaskResponse[]>(`/tasks/tags/${tag}`);

export const createTask = (data: TaskCreate) =>
    API.post<TaskResponse>("/tasks/", data);

export const updateTask = (id:number, data:TaskCreate) =>
    API.put<TaskResponse>(`/tasks/${id}`, data);

export const deleteTask = (id:number) =>
    API.delete<{ message: string }>(`/tasks/${id}`);