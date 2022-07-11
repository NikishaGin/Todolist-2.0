import {TodolistsType} from "../App";
import {v1} from "uuid";

export const TodoListsReducers = (state: TodolistsType [], action: bossType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((filtered)=>filtered.id !== action.payload.todolistId1 )
        }
        case "ADD-TODOLIST": {
            let newID = v1()
            let newTodolist: TodolistsType = {id: newID, title: action.payload.newTodolistTitle, filter: 'All'}
            return [...state,newTodolist]
        }
        default: return state
    }
}


type bossType = TodoListsReducersACType | addTodoListsACReducersACType
type TodoListsReducersACType = ReturnType<typeof removeTodoListsAC >
export const removeTodoListsAC = (todolistId1:string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    }as const
}

type addTodoListsACReducersACType = ReturnType<typeof addTodoListsAC >
export const addTodoListsAC = (newTodolistTitle: string) => {
    return{
        type: "ADD-TODOLIST",
        payload: {newTodolistTitle}
    }as const
}
