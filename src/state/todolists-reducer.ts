import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type bossTodoListsType = removeTodoListsACType
    | addTodoListsACType
    | changeTodoListTitleACType
    | changeTodoListFilterACType
    | TypeSetTodolistAC


export type filteredButtonType = "All" | "Active" | "Completed"
export type TodolistDomainType = TodolistType & {
    filter: filteredButtonType
}


const initialState: TodolistDomainType [] = []

export const todoListsReducer = (state: TodolistDomainType [] = initialState, action: bossTodoListsType): TodolistDomainType [] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((el) => el.id !== action.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "All"}
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return [...state].map((el) => el.id === action.id ? {...el, title: action.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return [
                ...state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
            ]
        }
        case "SET-TODOLIST": {
            return action.todolist.map(t => {
                return {
                    ...t,
                    filter: "All"
                }
            })
        }
        default:
            return state
    }
}

export type removeTodoListsACType = ReturnType<typeof removeTodoListsAC>
export const removeTodoListsAC = (todolistId1: string) => {
    return {
        type: "REMOVE-TODOLIST", id: todolistId1
    } as const
}

export type addTodoListsACType = ReturnType<typeof addTodoListsAC>
export const addTodoListsAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST', todolist: todolist
    } as const
}

type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE", id: todolistId2, title: newTodolistTitle
    } as const
}

export type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (todolistId2: string, newFilter: filteredButtonType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER', id: todolistId2, filter: newFilter
    } as const
}

export type TypeSetTodolistAC = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (todolist: TodolistType []) => {
    return {type: "SET-TODOLIST", todolist: todolist} as const
}

export const fetchTodolistTC = () => {
    return (dispatch: Dispatch<bossTodoListsType>) => {
        todolistsApi.getTodolist()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }
}

export const removeTodoListsTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolist(id)
            .then((res) => {
                dispatch(removeTodoListsAC(id))
            })
    }
}

export const addTodoListsTC = (newTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolist(newTitle)
            .then((res) => {
                dispatch(addTodoListsAC(res.data.data.item))
            })
    }
}

export const changeTodoListTitleTC = (todolistID: string, newTitle: string) => {
    return (dispatch: Dispatch)=>{
        todolistsApi.updateTodolist(todolistID, newTitle)
            .then((res)=>{
                dispatch(changeTodoListTitleAC(todolistID, newTitle))
            })
    }
}