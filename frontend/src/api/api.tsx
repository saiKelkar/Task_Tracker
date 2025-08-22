import axios from "axios";
import type { TaskCreate, TaskResponse } from "./types";
import { TaskProgress } from "./types";

const API = axios.create({
    baseURL: "https://task-tracker-i1wv.onrender.com/",
});

export const getTasks = () => 
    API.get<TaskResponse[]>("/");

export const getTaskById = (id:number) => 
    API.get<TaskResponse>(`/${id}`);

export const getTasksByTag = (tag:TaskProgress) =>
    API.get<TaskResponse[]>(`/tags/${tag}`);

export const createTask = (data: TaskCreate) =>
    API.post<TaskResponse>("/", data);

export const updateTask = (id:number, data:TaskCreate) =>
    API.put<TaskResponse>(`/${id}`, data);

export const deleteTask = (id:number) =>
    API.delete<{ message: string }>(`/${id}`);