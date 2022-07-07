type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: TasksType []
}

export const Todolist = (props: TodolistType) => {
    return (
        <div><h3>{props.title}</h3>
            <ul>
                {props.tasks.map((el)=>{
                    return (
                        <li key={el.id}><input type={"checkbox"} checked={el.isDone}/><span>{el.title}</span></li>
                    )
                })}
            </ul>
        </div>
    )
}