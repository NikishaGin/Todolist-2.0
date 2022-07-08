import {useState} from "react";

type PropsType = {
    title: string
}


export const EditableSpan = (props: PropsType) => {
    let [edit, setEdit] = useState(false)

    const editTrueAndFalse = () => {
        setEdit(!edit)
    }

    return (
        edit
            ? <input autoFocus onBlur={editTrueAndFalse} type='text' value={props.title}/>
            : <span onClick={editTrueAndFalse}>{props.title}</span>
    )
}