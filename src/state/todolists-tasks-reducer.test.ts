import {taskReducer} from "./task-reducer";
import {addTodoListsAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {TasksStateType} from "../App/App";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodoListsAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
