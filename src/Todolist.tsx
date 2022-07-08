import {ChangeEvent, useState} from "react";
import {filteredButtonType, TodolistsType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    removeTodolist:(id:string)=>void
    editTodolist:(todolistID: string,newTitle: string)=>void
    editTasks:(todolistID: string,taskID: string,newTitle: string)=>void
}

export const Todolist = (props: TodolistType) => {

    const removeTasksHandler = (todolistID: string, id:string) => {
        props.removeTasks(props.id,id)
    }

    const AddItemFormHandler = (newTitle: string) => {
        props.addTasks(props.id,newTitle)
    }

    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id,newTitle)

    }

    const editTasksHandler = (el: string,newTitle: string) => {
        props.editTasks(props.id,el,newTitle)
    }



    return (
        <div>
            <h3>
            <EditableSpan title={props.title} callback={editTodolistHandler}/>
            <button onClick={()=>props.removeTodolist(props.id)}>X</button>
            </h3>
            <AddItemForm callback={AddItemFormHandler}  />
            <ul>
                {props.tasks.map((el) => {
                    let checkedHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.checkedTasks(props.id,el.id, newIsDoneValue)
                    }
                    return (
                        <li key={el.id}>
                            <button onClick={(e) => removeTasksHandler(props.id,el.id)}>X</button>
                            <input type={"checkbox"} onChange={checkedHandler}
                                   checked={el.isDone}/>
                            <EditableSpan title={el.title} callback={(newTitle)=>editTasksHandler(el.id,newTitle)} />
                            {/*<span>{el.title}</span>*/}
                        </li>
                    )
                })}
            </ul>
            <button onClick={()=>props.filteredButton(props.id, 'All')}>All</button>
            <button onClick={()=>props.filteredButton(props.id,'Active')}>Active</button>
            <button onClick={()=>props.filteredButton(props.id,'Completed')}>Completed</button>
        </div>
    )
}