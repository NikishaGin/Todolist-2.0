import {ChangeEvent, useState} from "react";
import {filteredButtonType, TodolistsType} from "./App";

type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    tasks: TasksType []
    addTasks: (todolistID: string,newTitle: string) => void
    removeTasks: (todolistID: string,id:string) => void
    filter: string
    checkedTasks:(todolistID: string,id: string,isDone: boolean)=>void
    filteredButton:(todolistID: string,value: filteredButtonType)=>void
}

export const Todolist = (props: TodolistType) => {

    let [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTasksHandler = () => {
        props.addTasks(props.id,title);
        setTitle('')
    }

    const removeTasksHandler = (todolistID: string, id:string) => {
        props.removeTasks(props.id,id)
    }


    return (
        <div><h3>{props.title}</h3>
            <input value={title} onChange={onChangeHandler}/>
            <button onClick={addTasksHandler}>+</button>
            <ul>
                {props.tasks.map((el) => {
                    let checkedHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.checkedTasks(props.id,el.id, newIsDoneValue)
                    }
                    return (
                        <li key={el.id}>
                            <button onClick={(e) => removeTasksHandler(props.id,el.id)}>X</button>
                            <input type={"checkbox"} onChange={checkedHandler} checked={el.isDone}/><span>{el.title}</span></li>
                    )
                })}
            </ul>
            <button onClick={()=>props.filteredButton(props.id, 'All')}>All</button>
            <button onClick={()=>props.filteredButton(props.id,'Active')}>Active</button>
            <button onClick={()=>props.filteredButton(props.id,'Completed')}>Completed</button>
        </div>
    )
}