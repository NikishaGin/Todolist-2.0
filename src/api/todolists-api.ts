import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '7397bfad-fe31-49ed-bbf1-9ec6678bff95'
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TodolistType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

type GetTaskResponse = {
    error: string
    totalCount: number
    items: TaskType[]
}

export enum TaskStatuses  {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const todolistsApi = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType [] }>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists${todolistId}/tasks`)
    },
    deleteTasks(todolistId: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists${todolistId}/tasks/${taskID}`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskID: string, title: string) {
        return instance.put<ResponseType<TaskType>>(`todo-lists${todolistId}/tasks/${taskID}`, {title: title})
    }

}