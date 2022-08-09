import React from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: "Task Component",
    component: Task
}

const checkedTasks = action("Status Task")
const removeTasks = action("Remove Task")
const editTasks = action("Title Checked")



export const TaskBaseExample = (props: any) => {
    return <>
        <Task
        task={{id: "1", status: TaskStatuses.New, title: "CSS", todoListId: "todolistID1",
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}}
        todolistID={"todolistID1"}
        checkedTasks={checkedTasks}
        removeTasks={removeTasks}
        editTasks={editTasks} />
        <Task
            task={{id: "1", status: TaskStatuses.New, title: "js", todoListId: "todolistID1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}}
            todolistID={"todolistID2"}
            checkedTasks={checkedTasks}
            removeTasks={removeTasks}
            editTasks={editTasks} />
        </>
}