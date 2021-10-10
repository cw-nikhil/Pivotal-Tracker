import React, { useState, useEffect } from 'react'

function InputTask({desc, setIsEditMode, setDesc, saveTask, isLast}) {
    console.log("InputTask");
    const [isDeleted, setIsDeleted] = useState(false);
    const [isTaskHovered, setIsTaskHovered] = useState(false);

    const setTaskHovered = () => {
        setIsTaskHovered(!isTaskHovered);
    }

    const onBlur = () => {
        // if (isLast) {
        //     alert("last");
        // }
        setTimeout(() => {
            console.log("blurred");
            // setIsEditMode(0);
            setIsEditMode(isLast ? 2 : 0);
        }, 200);
    }

    // useEffect(() => {
    //     document.querySelector(".inputTask").focus();
    // }, [])
    
    return (
        // <button onClick = {() => {alert("nik")}}>button</button>
        <div className = "taskContainer" onBlur = {() => onBlur()}>
            <input type = "checkbox" className = "checkBox" disabled = "true"/>
            <textarea className = "inputTask" autoFocus>{desc}</textarea>
            <div style = {{flexGrow: "3", display: "flex", flexBasis: "0"}}>
                <button className = "saveTask" onClick = {() => saveTask()}>Save</button>
                {/* <button onClick = {() => {alert("nik")}}>button</button> */}
            </div>
        </div>
    )
}


export default InputTask;



// const onBlur = () => {
//     setTimeout(() => {
//         if (initialMode) {
//             setMode(taskMode.add);
//             setIsAddTaskClicked(0);
//         }
//         else {
//             setMode(taskMode.saved);
//         }
//     }, 200);
// }