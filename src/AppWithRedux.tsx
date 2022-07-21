import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListsAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, removeTodoListsAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type filteredButtonType = "All" | "Active" | "Completed"

export type TodoListsType = {
    id: string
    title: string
    filter: filteredButtonType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector <AppRootStateType,Array<TodoListsType>>(state=>state.todolists)
    const tasks = useSelector <AppRootStateType,TasksStateType>(state=>state.tasks)

    const removeTodolist = (id: string) => {
        const action = removeTodoListsAC(id)
        dispatch(action)

    }
    const addTodolist = (newTitle: string) => {
        const action = addTodoListsAC(newTitle)
        dispatch(action)

    }

    const changeTodoListTitle = (todolistID: string, newTitle: string) => {
        const action = changeTodoListTitleAC(todolistID, newTitle)
        dispatch(action)
    }

    function changeTodoListFilter(todolistID: string, value: filteredButtonType) {
        const action = changeTodoListFilterAC(todolistID, value)
        dispatch(action)
    }


    const removeTasks = (todolistID: string, id: string) => {
        const action = removeTaskAC(todolistID, id)
        dispatch(action)
    }

    const addTasks = (todolistID: string, newTitle: string) => {
        const action = addTaskAC(todolistID, newTitle)
        dispatch(action)
    }

    const changeTaskStatus = (todolistID: string, id: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistID, id, isDone)
        dispatch(action)
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatch(action)
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

                        if (mapID.filter === "Active") {
                            filterTasks = tasks[mapID.id].filter((filtered) => filtered.isDone === true)
                        }

                        if (mapID.filter === "Completed") {
                            filterTasks = tasks[mapID.id].filter((filtered) => filtered.isDone === false)
                        }

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

export default AppWithRedux;
