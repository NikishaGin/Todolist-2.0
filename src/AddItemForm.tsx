import {ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";

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
            {/*<input value={title} onChange={onChangeHandler}/>*/}
            <TextField id="filled-basic" label="Title" variant="filled" size="small" value={title} onChange={onChangeHandler} />
            {/*<button onClick={addTasksHandler}>+</button>*/}

            <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCart onClick={addTasksHandler} />
            </IconButton>
        </div>
    )
}