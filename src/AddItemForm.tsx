import {ChangeEvent, useState} from "react";

type PropsType = {
    callback:(newTitle: string)=>void
}

export const AddItemForm = (props:PropsType) => {


    let [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTasksHandler = () => {
        props.callback(title);
        setTitle('')
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler}/>
            <button onClick={addTasksHandler}>+</button>
        </div>
    )
}