import {ChangeEvent, useCallback, useState} from "react";
import {filteredButtonType, TodoListsType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {pink} from "@mui/material/colors";
import React from "react";
import {Task} from "./Task";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    tasks: TasksType []
    addTasks: (todolistID: string, newTitle: string) => void
    removeTasks: (todolistID: string, id: string) => void
    filter: string
    checkedTasks: (todolistID: string, id: string, isDone: boolean) => void
    filteredButton: (todolistID: string, value: filteredButtonType) => void
    removeTodolist: (id: string) => void
    editTodolist: (todolistID: string, newTitle: string) => void
    editTasks: (todolistID: string, taskID: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistType) => {

    const AddItemFormHandler = useCallback((newTitle: string) => {
        props.addTasks(props.id, newTitle)
    }, [props.addTasks, props.id])

    const editTodolistHandler = useCallback((newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }, [props.editTodolist, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "Active") {
        tasksForTodolist = props.tasks.filter((filtered) => filtered.isDone === true)
    }

    if (props.filter === "Completed") {
        tasksForTodolist = props.tasks.filter((filtered) => filtered.isDone === false)
    }


    const onclickAllHandler = useCallback(() => props.filteredButton(props.id, 'All'), [props.filteredButton, props.id])
    const onclickActiveHandler = useCallback(() => props.filteredButton(props.id, 'Active'), [props.filteredButton, props.id])
    const onclickCompletedHandler = useCallback(() => props.filteredButton(props.id, 'Completed'), [props.filteredButton, props.id])


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={editTodolistHandler}/>
                {/*<button onClick={()=>props.removeTodolist(props.id)}>X</button>*/}
                <IconButton aria-label="delete">
                    <Delete onClick={() => props.removeTodolist(props.id)}/>
                </IconButton>
            </h3>
            <AddItemForm callback={AddItemFormHandler}/>
            <ul>
                {tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistID={props.id}
                    checkedTasks={props.checkedTasks}
                    removeTasks={props.removeTasks}
                    editTasks={props.editTasks}/>
                    )}
            </ul>
            <Button color="secondary" onClick={onclickAllHandler}>All</Button>
            <Button variant="contained" color="success" onClick={onclickActiveHandler}>Active</Button>
            <Button variant="outlined" color="error" onClick={onclickCompletedHandler}>Completed</Button>
        </div>
    )
})

