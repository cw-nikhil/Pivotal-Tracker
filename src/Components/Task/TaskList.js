import React from 'react';
import SavedTask from "./SavedTask";
import AddTask from "./AddTask";
import {useState} from "react";

export default function TaskList(props) {
    const [taskList, setTaskList] = useState(props.taskList);
    const addTask = desc => {
        const newTask = {
            id: taskList.length,
            isChecked: false,
            desc: desc,
        };
        setTaskList([...taskList, newTask]);
    }
    return (
        <div>
            {taskList.map(task => <SavedTask {...task}/>)}
            <AddTask addTask = {addTask}/>
        </div>
    )
}
