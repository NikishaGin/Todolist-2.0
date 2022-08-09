import React, {useCallback} from 'react';
import '../App.css';
import {Todolist} from "../Components-App/Todolist";
import {AddItemForm} from "../Components-App/AddItemForm";
import ButtonAppBar from "../Components-App/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListsAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, filteredButtonType, removeTodoListsAC, TodolistDomainType,
} from "../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TaskStatuses, TaskType, TodolistType} from "../api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector <AppRootStateType,Array<TodolistDomainType>>(state=>state.todolists)
    const tasks = useSelector <AppRootStateType,TasksStateType>(state=>state.tasks)

    const removeTodolist =useCallback( (id: string) => {
        const action = removeTodoListsAC(id)
        dispatch(action)

    },[dispatch] )
    const addTodolist =useCallback( (newTitle: string) => {
        const action = addTodoListsAC(newTitle)
        dispatch(action)

    },[dispatch] )

    const changeTodoListTitle =useCallback( (todolistID: string, newTitle: string) => {
        const action = changeTodoListTitleAC(todolistID, newTitle)
        dispatch(action)
    }
   ,[dispatch] )
    const changeTodoListFilter =useCallback( (todolistID: string, value: filteredButtonType) => {
        const action = changeTodoListFilterAC(todolistID, value)
        dispatch(action)
    }
   ,[dispatch] )

    const removeTasks =useCallback( (todolistID: string, id: string) => {
        const action = removeTaskAC(todolistID, id)
        dispatch(action)
    },[dispatch])

    const addTasks =useCallback( useCallback( (todolistID: string, newTitle: string) => {
        const action = addTaskAC(todolistID, newTitle)
        dispatch(action)
    }, [dispatch]),[])

    const changeTaskStatus = useCallback( (todolistID: string,id: string, status: TaskStatuses ) => {
        const action = changeTaskStatusAC(todolistID, id, status)
        dispatch(action)
    },[dispatch])

    const changeTaskTitle = useCallback( (todolistID: string, taskID: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((mapID) => {

                        let allTodolistTasks = tasks[mapID.id]
                        /*let tasksForTodolist = allTodolistTasks*/

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist key={mapID.id}
                                          id={mapID.id}
                                          title={mapID.title}
                                          tasks={allTodolistTasks}
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
