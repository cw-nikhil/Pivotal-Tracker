import React, {useState} from 'react';
import deleteIcon from "../../Icons/delete.png";
import featureIcon from "../../Icons/feature.jpg";

export default function SavedTask(props) {
    const [isEditMode, setIsEditMode] = useState(0);
    const [desc, setDesc] = useState(props.desc);
    const [isDeleted, setIsDeleted] = useState(0);
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const isTaskHovered = 4;
    const setIsTaskHovered = () => {};

    const save = () => {
        console.log("save");
        const text = document.querySelector(".inputTask").value;
        setDesc(text);
        setIsEditMode(0);
    }

    const onBlur = e => {
        const cn = e.relatedTarget?.className;
        if (cn !== "saveTask" && cn !== "checkbox") {
            setIsEditMode(0);
        }
    }

    if (isDeleted) {
        return null;
    }
    if (isEditMode) {
        return (
            <div className = "taskContainer" onBlur = {e => onBlur(e)}>
                <input type = "checkbox" className = "checkBox" disabled = "true"/>
                <textarea className = "inputTask" autoFocus>{desc}</textarea>
                <div style = {{flexGrow: "3", display: "flex", flexBasis: "0"}}>
                    <button className = "saveTask" onClick = {() => save()}>Save1</button>
                </div>
            </div>
        )
    }
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
