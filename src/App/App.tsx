import React, {useState} from 'react';
import '../App.css';
import {Todolist} from "../Components-App/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../Components-App/AddItemForm";
import ButtonAppBar from "../Components-App/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {filteredButtonType, TodolistDomainType} from "../state/todolists-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'All', addedDate: '', order: 0},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    const removeTodolist = (id:string) => {
        setTodolists([...todolists.filter((filteredTodo)=>filteredTodo.id !== id)])
    }
    const AddTodolist = (newTitle: string) => {
        let newID = v1()
        let newTodolist: TodolistDomainType = {id: newID, title: newTitle, filter: 'All',addedDate: '', order: 0}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newID]:[]})
    }

    const editTodolist = (todolistID: string,newTitle: string) => {
            setTodolists([...todolists.map((edit)=>edit.id === todolistID ? {...edit,title:newTitle}: edit)])
    }

    function filteredButton(todolistID: string, value: filteredButtonType) {
        setTodolists(todolists.map((filtered)=>filtered.id === todolistID ? {...filtered, filter: value}:filtered))
    }

    const removeTasks = (todolistID: string,id:string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter((remove)=>remove.id !== id)})
    }

    const addTasks = (todolistID: string,newTitle: string) => {
        let newTasks = {id: v1(), title: newTitle, status: TaskStatuses.New, todoListId: todolistID,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        setTasks({...tasks,[todolistID]:[newTasks,...tasks[todolistID]]})
    }

    const editTasks = (todolistID: string, taskID: string,newTitle: string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map((el)=>el.id === taskID ? {...el,title:newTitle}:el)})
    }

    const checkedTasks = (todolistID: string,id: string, status: TaskStatuses ) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map((mapChecked)=>mapChecked.id === id ? {...mapChecked,status}:mapChecked)})
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

/*                    if (mapID.filter === "Active") {
                        filterTasks = tasks[mapID.id].filter((filtered)=>filtered.status === TaskStatuses.New)
                    }

                    if (mapID.filter === "Completed") {
                        filterTasks = tasks[mapID.id].filter((filtered)=>filtered.status === TaskStatuses.Completed)
                    }*/

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
