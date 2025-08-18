export type TaskCreate = {
    taskHead: string;
    taskBody: string;
    tags: TaskProgress;
};

export type TaskResponse = TaskCreate & {
    id: number;
    createdAt?: string;
    updatedAt?: string;
};

export const TaskProgress = {
    TO_DO: "to_do",
    IN_PROGRESS: "in_progress",
    DONE: "done",
} as const;
export type TaskProgress = (typeof TaskProgress)[keyof typeof TaskProgress];