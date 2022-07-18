import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type filteredButtonType = "All" | "Active" | "Completed"

export type TodolistsType = {
    id: string
    title: string
    filter: filteredButtonType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const editTodolist = (todolistID: string,newTitle: string) => {
            setTodolists([...todolists.map((edit)=>edit.id === todolistID ? {...edit,title:newTitle}: edit)])
    }

    const editTasks = (todolistID: string, taskID: string,newTitle: string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map((el)=>el.id === taskID ? {...el,title:newTitle}:el)})
    }

    const removeTodolist = (id:string) => {
        setTodolists([...todolists.filter((filteredTodo)=>filteredTodo.id !== id)])
    }

    const checkedTasks = (todolistID: string,id: string,isDone: boolean) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map((mapChecked)=>mapChecked.id === id ? {...mapChecked,isDone}:mapChecked)})
    }


    const addTasks = (todolistID: string,newTitle: string) => {
        let newTasks = {id: v1(), title: newTitle, isDone: true}
        setTasks({...tasks,[todolistID]:[newTasks,...tasks[todolistID]]})
    }

    const removeTasks = (todolistID: string,id:string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter((remove)=>remove.id !== id)})
    }

    function filteredButton(todolistID: string, value: filteredButtonType) {
        setTodolists(todolists.map((filtered)=>filtered.id === todolistID ? {...filtered, filter: value}:filtered))
    }

    const AddTodolist = (newTitle: string) => {
        let newID = v1()
        let newTodolist: TodolistsType = {id: newID, title: newTitle, filter: 'All'}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newID]:[]})
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm callback={AddTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                {todolists.map((mapID)=>{

                    let filterTasks =  tasks[mapID.id]

                    if (mapID.filter === "Active") {
                        filterTasks = tasks[mapID.id].filter((filtered)=>filtered.isDone === true)
                    }

                    if (mapID.filter === "Completed") {
                        filterTasks = tasks[mapID.id].filter((filtered)=>filtered.isDone === false)
                    }

                    return <Grid item>
                        <Paper style={{padding: "10px"}}>
                        <Todolist key={mapID.id}
                                  id={mapID.id}
                                  title={mapID.title}
                                  tasks={filterTasks}
                                  addTasks={addTasks}
                                  removeTasks={removeTasks}
                                  filteredButton={filteredButton}
                                  filter={mapID.filter}
                                  checkedTasks={checkedTasks}
                                  removeTodolist={removeTodolist}
                                  editTodolist={editTodolist}
                                  editTasks={editTasks}/>
                        </Paper>
                            </Grid>
                })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
