import React from 'react';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import {v1} from "uuid";
import {AppRootStateType} from "./store/store";
import {taskReducer} from "./state/task-reducer";
import {todoListsReducer} from "./state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: "todolistID1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistID1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: "todolistId2",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: "todolistId2",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)