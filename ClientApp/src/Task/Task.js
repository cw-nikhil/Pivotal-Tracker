import React, { useState, memo,useEffect } from 'react';
import InputTask from './InputTask';
import SavedTask from "./SavedTask";

function Task(props) {
    // console.log(props);
    console.log(`${props.id}: Task`);
    let [isEditMode, setIsEditMode] = useState(props.isEditMode);
    let [desc, setDesc] = useState(props.desc);
    const [setIsAddTaskClicked, setIsAddTaskClicked1] = useState(props.setIsAddTaskClicked);
    let isLast = props.setTaskList ? 1 : 0;
    const saveTask = () => {
        const taskDesc = document.querySelector(".inputTask")?.value;
        if (!taskDesc) {
            return;
        }
        if (!props.setTaskList) {
            setIsEditMode(0);
            setDesc(taskDesc);
        }
        else {
            props.setTaskList(taskDesc);
        }
    }
    
    useEffect(() => {
        setDesc(props.desc);
        setIsEditMode(props.isEditMode);
    }, [props.desc, props.isEditMode]);

    // useEffect(() => {
    //     setIsAddTaskClicked = props.setIsAddTaskClicked;
    // }, [])

    if (isEditMode < 2) {
        return isEditMode ? <InputTask desc = {desc} saveTask = {saveTask} setIsEditMode = {setIsEditMode} initialMode = {props.initialMode} isLast = {isLast}/> : 
                        <SavedTask {...props} desc = {desc} setIsEditMode = {setIsEditMode}/>
    }
    else {
        return <p className = "taskDescription" onClick = {() => setIsAddTaskClicked()}>+ Add Task</p>;
    }

}

export default memo(Task);

// https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928
// <SavedTask isChecked = {isChecked} desc = {desc} isFirst = {isFirst} isLast = {isLast} setInEditMode = {setInEditMode} moveTask = {moveTask} ind = {ind}/>