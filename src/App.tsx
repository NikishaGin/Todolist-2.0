import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filteredButtonType = "All" | "Active" | "Completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const removeTasks = (id:string) => {
        setTasks([...tasks].filter((revFilter)=>revFilter.id !== id))
    }

    const addTasks = (newTitle: string) => {
        setTasks([{id: v1(), title: newTitle, isDone: false},...tasks])
    }

    let [filter, setFilter] = useState<filteredButtonType>('All')

    if (filter === "Active") {
        tasks = tasks.filter((filtered)=>filtered.isDone === true)
    }

    if (filter === "Completed") {
        tasks = tasks.filter((filtered)=>filtered.isDone === false)
    }

    const filteredButton = (value:filteredButtonType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={"What To Learn "}
                      tasks={tasks}
                      addTasks={addTasks}
                      removeTasks={removeTasks}
                      filteredButton={filteredButton} />
        </div>
    );
}

export default App;
