import {ChangeEvent, useState} from "react";

type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: TasksType []
    addTasks:(newTitle: string)=>void
    removeTasks:(id:string)=>void
}

export const Todolist = (props: TodolistType) => {

    let [title, setTitle] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    const addTasksHandler = () => {props.addTasks(title); setTitle('') }

    const removeTasksHandler = (id:string) => {props.removeTasks(id)}


    return (
        <div><h3>{props.title}</h3>
            <input value={title} onChange={onChangeHandler}/>
            <button onClick={addTasksHandler}>+</button>
            <ul>
                {props.tasks.map((el)=>{
                    return (
                        <li key={el.id}>
                            <button onClick={(e)=>removeTasksHandler(el.id)}>X</button>
                            <input type={"checkbox"} checked={el.isDone}/><span>{el.title}</span></li>
                    )
                })}
            </ul>
        </div>
    )
}