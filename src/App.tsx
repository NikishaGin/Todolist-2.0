import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

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


    return (
        <div className="App">
            <Todolist title={"What To Learn "}
                      tasks={tasks}
                      addTasks={addTasks}
                      removeTasks={removeTasks}/>
        </div>
    );
}

export default App;
