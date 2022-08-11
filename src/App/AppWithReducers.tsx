import React, {useReducer, useState} from 'react';
import '../App.css';
import {Todolist} from "../Components-App/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../Components-App/AddItemForm";
import ButtonAppBar from "../Components-App/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListsAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, removeTodoListsAC,
    todoListsReducer
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../state/task-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

export type filteredButtonType = "All" | "Active" | "Completed"

export type TodoListsType = {
    id: string
    title: string
    filter: filteredButtonType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All',addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'All',addedDate: '', order: 0},
    ])

    let [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, todoListId: todolistID2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: 'GraphQL', status: TaskStatuses.Completed, todoListId: todolistID2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
        ]
    })

    const removeTodolist = (id: string) => {
        const action = removeTodoListsAC(id)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodolist = (newTitle: string) => {
/*        const action = addTodoListsAC(newTitle)
        dispatchTodoLists(action)
        dispatchTasks(action)*/
    }

    const changeTodoListTitle = (todolistID: string, newTitle: string) => {
        const action = changeTodoListTitleAC(todolistID, newTitle)
        dispatchTodoLists(action)
    }

    function changeTodoListFilter(todolistID: string, value: filteredButtonType) {
        const action = changeTodoListFilterAC(todolistID, value)
        dispatchTodoLists(action)
    }


    const removeTasks = (todolistID: string, id: string) => {
        const action = removeTaskAC(todolistID, id)
        dispatchTasks(action)
    }

    const addTasks = (todolistID: string, newTitle: string) => {
      /*  const action = addTaskAC(todolistID, newTitle)
        dispatchTasks(action)*/
    }

    const changeTaskStatus = (todolistID: string, id: string, status: TaskStatuses) => {
        const action = changeTaskStatusAC(todolistID, id, status)
        dispatchTasks(action)
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatchTasks(action)
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((mapID) => {

                        let filterTasks = tasks[mapID.id]

/*                        if (mapID.filter === "Active") {
                            filterTasks = tasks[mapID.id].filter((filtered) => filtered.isDone === true)
                        }

                        if (mapID.filter === "Completed") {
                            filterTasks = tasks[mapID.id].filter((filtered) => filtered.isDone === false)
                        }*/

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist key={mapID.id}
                                          id={mapID.id}
                                          title={mapID.title}
                                          tasks={filterTasks}
                                          addTasks={addTasks}
                                          removeTasks={removeTasks}
                                          filteredButton={changeTodoListFilter}
                                          filter={mapID.filter}
                                          checkedTasks={changeTaskStatus}
                                          removeTodolist={removeTodolist}
                                          editTodolist={changeTodoListTitle}
                                          editTasks={changeTaskTitle}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;
