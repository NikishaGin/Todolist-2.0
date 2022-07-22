import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListsACType, removeTodoListsACType} from "./todolists-reducer";

type bossTaskType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodoListsACType
    | removeTodoListsACType

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState , action: bossTaskType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId2]:state[action.todolistId2].filter(el=>el.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title , isDone: false}
            return {
                ...state,[action.todolistId2]:[newTask,...state[action.todolistId2]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId2]:state[action.todolistId2].map(el=>el.id===action.taskID ? {...el,isDone:action.isDone}:el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId2]:state[action.todolistId2].map(el=>el.id===action.taskID ? {...el,title: action.title}: el)
            }
        }
        case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return  state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId2: string,taskID: string,) => {
    return {
        type: "REMOVE-TASK", taskID, todolistId2
    }as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId2:string,title: string) => {
    return{
        type: "ADD-TASK", title, todolistId2
    }as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId2: string,taskID: string,isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS", taskID, todolistId2, isDone
    }as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId2: string,taskID: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE", taskID, title, todolistId2
    }as const
}


