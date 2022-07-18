import {TasksType} from "../Todolist";
import {TasksStateType} from "../App";
import {v1} from "uuid";

type bossType = removeTaskACType | addTaskACType | changeTaskStatusACType | titleACType

export const tasksReducer = (state: TasksStateType, action: bossType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID2]: state[action.todolistID2].filter(el => el.id !== action.id)
            }
        case "ADD-TASK": {
            let newTasks = {id: v1(), title: action.juce, isDone: false}
            return ({...state, [action.todolistID2]: [newTasks, ...state[action.todolistID2]]})
        }
        case "CHANGE-STATUS": {
                return {
                    ...state,
                    [action.todolistID2]:state[action.todolistID2].map(el=>el.id === action.twoID ? {...el,isDone: action.isDone} : el)
                }
        }
        case "TITLE-STATUS": {

            return {
                ...state,
                [action.todolistID2]:state[action.todolistID2].map(el=>el.id === action.twoID ? {...el,title: action.title}:el)

            }
        }
        default:
            return state
    }
}


type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistID2: string) => {
    return {
        type: "REMOVE-TASK", id, todolistID2
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (juce: string, todolistID2: string) => {
    return {
        type: "ADD-TASK", juce, todolistID2
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (twoID: string, isDone: boolean, todolistID2: string) => {
    return {
        type: "CHANGE-STATUS", twoID, isDone, todolistID2
    } as const
}

type titleACType = ReturnType<typeof titleAC>
export const titleAC = (twoID: string, title: string, todolistID2: string) => {
    return {
        type: "TITLE-STATUS", twoID, title, todolistID2
    } as const
}
