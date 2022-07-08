import {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    callback:(changeTitle:string)=>void
}


export const EditableSpan = (props: PropsType) => {
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
            ? <input autoFocus onBlur={editTrueAndFalse}
                     onChange={onChangeHandler} type='text' value={newTitle}/>
            : <span onClick={editTrueAndFalse}>{props.title}</span>
    )
}