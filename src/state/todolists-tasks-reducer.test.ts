import {taskReducer} from "./task-reducer";
import {addTodoListsAC, todoListsReducer} from "./todolists-reducer";
import {TasksStateType, TodoListsType} from "../App";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const action = addTodoListsAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
