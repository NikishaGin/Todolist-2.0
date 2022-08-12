import {TasksStateType} from "../App/App";
import {addTodoListsACType, removeTodoListsACType, TypeSetTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

export type bossTaskType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodoListsACType
    | removeTodoListsACType
    | TypeSetTodolistAC
    | TypeSetTaskAC

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: bossTaskType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId2]: state[action.todolistId2].filter(el => el.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            let newTask = action.task
            return {
                ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId2]: state[action.todolistId2].map(el => el.id === action.taskID ? {
                    ...el,
                    status: action.status
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId2]: state[action.todolistId2].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.todolist.id] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todolist.forEach(t => {
                copyState [t.id] = []
            })
            return copyState
        }
        case "SET-TASK": {
            const copyState = {...state}
            copyState[action.taskID] = action.task
            return copyState
        }

        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId2: string, taskID: string,) => {
    return {
        type: "REMOVE-TASK", taskID, todolistId2
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK", task
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId2: string, taskID: string, status: TaskStatuses) => {
    debugger
    return {
        type: "CHANGE-TASK-STATUS", taskID, todolistId2, status
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId2: string, taskID: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE", taskID, title, todolistId2
    } as const
}

export type TypeSetTaskAC = ReturnType<typeof setTaskAC>
export const setTaskAC = (task: TaskType [], taskID: string) => {
    return {
        type: 'SET-TASK', task: task, taskID: taskID
    } as const
}

export const fetchTasksTC = (taskID: string) => {
    return (dispatch: Dispatch) =>{
        todolistsApi.getTasks(taskID)
            .then((res)=>{
                dispatch(setTaskAC(res.data.items,taskID))
            })
    }
}

export const removeTasksTC = (todolistID: string, id: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTasks(todolistID, id)
            .then((res)=>{
                const action = removeTaskAC(todolistID, id)
                dispatch(action)
            })
    }
}

export const addTasksTC = (todolistID: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTasks(todolistID,newTitle)
            .then((res)=>{
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
            })
    }
}

export const updateTaskStatusTC = (todolistID: string,id: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: ()=>AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === id)

        if(!task) {return}

        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        todolistsApi.updateTask(todolistID, id, model)
            .then((res)=>{
                const action = changeTaskStatusAC(todolistID, id, status)
                    dispatch(action)
            })
    }
}

export const updateTaskTitleTC = (todolistID: string, taskID: string, newTitle: string) => {
    return (dispatch: Dispatch, getState: ()=> AppRootStateType)=>{

        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if(!task) {return}

        const model: UpdateTaskModelType = {
            title: newTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        todolistsApi.updateTask(todolistID, taskID, model)
            .then(()=>{
                dispatch(changeTaskTitleAC(todolistID,taskID,newTitle))
            })
    }
}
