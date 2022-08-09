import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import React from "react";

type PropsType = {
    title: string
    callback:(newTitle:string)=>void
}


export const EditableSpan = React.memo( (props: PropsType) => {
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTasksHandler = () => {
        props.callback(newTitle);
        setNewTitle('')
    }



    let [edit, setEdit] = useState(false)

    const editTrueAndFalse = () => {
        setEdit(!edit)
        addTasksHandler()
    }

    return (
        edit
            ? /*<input autoFocus onBlur={editTrueAndFalse}
                     onChange={onChangeHandler} type='text' value={newTitle}/>*/
            <TextField
                label="Title"
                variant="standard"
                color="warning"
                focused
                autoFocus onBlur={editTrueAndFalse}
                onChange={onChangeHandler} type='text' value={newTitle}
            />
            : <span onClick={editTrueAndFalse}>{props.title}</span>
    )
})