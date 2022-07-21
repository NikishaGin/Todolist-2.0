import {filteredButtonType, TodoListsType} from "../App";
import {v1} from "uuid";

type bossTodoListsType = removeTodoListsACType
    | addTodoListsACType
    | changeTodoListTitleACType
    | changeTodoListFilterACType


export const todoListsReducer = (state: TodoListsType [], action: bossTodoListsType): TodoListsType [] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((el) => el.id !== action.id)
        }
        case "ADD-TODOLIST": {
            let newTodoLists: TodoListsType = {id: action.todolistId, title: action.title, filter: 'All'}
            return [...state, newTodoLists]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return [...state].map((el) => el.id === action.id ? {...el, title: action.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
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