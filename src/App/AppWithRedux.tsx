import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {Todolist} from "../Components-App/Todolist";
import {AddItemForm} from "../Components-App/AddItemForm";
import ButtonAppBar from "../Components-App/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodoListsAC, addTodoListsTC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, changeTodoListTitleTC,
    fetchTodolistTC,
    filteredButtonType,
    removeTodoListsAC, removeTodoListsTC,
    TodolistDomainType,
} from "../state/todolists-reducer";
import {
    addTaskAC,
    addTasksTC,
    changeTaskStatusAC, changeTaskStatusTC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTasksTC
} from "../state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "../store/store";
import {TaskStatuses, TaskType} from "../api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useTypedDispatch()

    const todolists = useSelector <AppRootStateType,Array<TodolistDomainType>>(state=>state.todolists)
    const tasks = useSelector <AppRootStateType,TasksStateType>(state=>state.tasks)

    useEffect(()=> {
        const thunk = fetchTodolistTC()
        dispatch(thunk)

    },[])

    const removeTodolist =useCallback( (id: string) => {
        const thunk = removeTodoListsTC(id)
        dispatch(thunk)

    },[dispatch] )
    const addTodolist =useCallback( (newTitle: string) => {
        const thunk = addTodoListsTC(newTitle)
        dispatch(thunk)

    },[dispatch] )

    const changeTodoListTitle =useCallback( (todolistID: string, newTitle: string) => {
        const thunk = changeTodoListTitleTC(todolistID, newTitle)
        dispatch(thunk)
    }
   ,[dispatch] )
    const changeTodoListFilter =useCallback( (todolistID: string, value: filteredButtonType) => {
        const action = changeTodoListFilterAC(todolistID, value)
        dispatch(action)
    }
   ,[dispatch] )

    const removeTasks =useCallback( (todolistID: string, id: string) => {
        const thunk = removeTasksTC(todolistID, id)
        dispatch(thunk)
    },[dispatch])

    const addTasks =useCallback( useCallback( (todolistID: string, newTitle: string) => {
        const thunk = addTasksTC(todolistID, newTitle)
        dispatch(thunk)
    }, [dispatch]),[])

    const changeTaskStatus = useCallback( (todolistID: string,id: string, status: TaskStatuses ) => {
        const thunk = changeTaskStatusTC(todolistID, id, status)
        dispatch(thunk)
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
