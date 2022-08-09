import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {pink} from "@mui/material/colors";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "../api/todolists-api";

type PropsTaskType = {
    task: TaskType
    todolistID: string
    checkedTasks: (todolistID: string,id: string, status: TaskStatuses ) => void
    removeTasks: (todolistID: string, id: string) => void
    editTasks: (todolistID: string, taskID: string, newTitle: string) => void

}

export const Task = React.memo( (props: PropsTaskType) => {
    let checkedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.checkedTasks(props.todolistID, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }

    const removeTasksHandler = useCallback ((todolistID: string, id: string) => {
        props.removeTasks(props.todolistID, id)
    },[props.removeTasks,props.todolistID])

    const editTasksHandler = useCallback ((el: string, newTitle: string) => {
        props.editTasks(props.todolistID, el, newTitle)
    },[props.editTasks,props.todolistID])

    return (
        <li key={props.task.id}>
            <IconButton aria-label="delete" size="small">
                <Delete onClick={() => removeTasksHandler(props.todolistID, props.task.id)} fontSize="small"/>
            </IconButton>
            <Checkbox
                defaultChecked
                sx={{color: pink[800], '&.Mui-checked': {color: pink[600],},}}
                onChange={checkedHandler} checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan title={props.task.title} callback={(newTitle) => editTasksHandler(props.task.id, newTitle)}/>
        </li>
    )
})