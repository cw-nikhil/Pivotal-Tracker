import React, { useState } from 'react'

const SavedTask = (props) => {
    const {isFirst, isLast, desc, setIsEditMode, id, ind} = props;
    console.log("SavedTask");
    const [isDeleted, setIsDeleted] = useState(false);
    const [isTaskHovered, setIsTaskHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(props.isChecked);

    const setTaskHovered = () => {
        // console.log("Task hovered");
        setIsTaskHovered(!isTaskHovered);
    }

    const deleteTask = () => {
        // console.log("Task deleted");
        setIsDeleted(true);
    }
    
    if (!isDeleted) {
        return (
            <div className = "taskContainer" onMouseEnter = {() => setIsTaskHovered(true)} onMouseLeave = {() => setIsTaskHovered(false)}>
                <input type = "checkbox" className = "checkBox" checked = {isChecked} onChange = {() => setIsChecked(!isChecked)}/>
                <p className = "taskDescription" onClick = {() => setIsEditMode(1)}>{desc}</p>
                <div className = "buttons">
                    {isTaskHovered && <button onClick = {() => setIsDeleted(true)}>Delete</button>}
                </div>
            </div>
        )
    }

    return null;
}

export default SavedTask;