import React, { useState, useCallback, useEffect } from 'react';
import Task from "./Task";
import { taskMode } from "../../Constants/Task";

export default function TaskList(props) {
    console.log("TaskList");
    const [taskList, setTaskList] = useState(props.taskList);
    let [isAddTaskClicked, setIsAddTaskClicked] = useState(0);
    
    useEffect(() => {
        console.log("abc");
        setIsAddTaskClicked(0);
    }, [taskList])

    const setIsAddTaskClicked1 = (x) => {
        console.log("setIsAddTaskClicked1 " + x);
        setIsAddTaskClicked(x)
    }

    const updateList = newTaskDesc => {
        let a = [...taskList];
        const taskCount = a.length;
        if (taskCount) {
            a[taskCount - 1].isLast = false;
        }
        const newTask = {
            id: taskCount,
            isChecked: false,
            desc: newTaskDesc,
            isFirst: !taskCount,
            isLast: true
        };
        setTaskList([...a, newTask]);
    }

    return (
        <div>
            {taskList.map((task, ind) => <Task key = {task.id} {...task} isEditMode = {0} ind = {ind} mode = {taskMode.saved}/>)}
            {isAddTaskClicked ? <Task desc = {""} isEditMode = {1} setTaskList = {updateList} mode = {taskMode.add}/> : 
            <Task desc = "" isEditMode = {2} setIsAddTaskClicked = {setIsAddTaskClicked1}/>}
        </div>
    )
}