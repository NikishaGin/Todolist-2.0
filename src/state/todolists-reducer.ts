import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

type bossTodoListsType = removeTodoListsACType
    | addTodoListsACType
    | changeTodoListTitleACType
    | changeTodoListFilterACType


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
            let newTodoLists: TodolistDomainType = {id: action.todolistId, title: action.title, filter: 'All', addedDate: '', order: 0}
            return [...state, newTodoLists]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return [...state].map((el) => el.id === action.id ? {...el, title: action.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return [
                ...state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
            ]
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
export const addTodoListsAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1()
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

