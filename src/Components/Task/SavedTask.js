import React, {useState, useEffect} from 'react';
import deleteIcon from "../../Icons/delete.png";
import featureIcon from "../../Icons/feature.jpg";
import "./css/SavedTask.css";

export default function SavedTask(props) {
    const [isEditMode, setIsEditMode] = useState(0);
    const [desc, setDesc] = useState(props.desc);
    const [isDeleted, setIsDeleted] = useState(0);
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const [isTaskHovered, setIsTaskHovered] = useState(false);

    useEffect(() => {
      const el = document.querySelector("textarea.inputTask");
      if (el) {
        el.setSelectionRange(desc.length, desc.length);
      }
    })

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
    };

    const deleteTask = () => {
      setIsDeleted(true);
    }

    if (isDeleted) {
        return null;
    }
    if (isEditMode) {
        return (
            <div className = "taskContainer">
                <input type = "checkbox" className = "checkBox" disabled = "true"/>
                <textarea className = "inputTask" autoFocus>{desc}</textarea>
                <button className = "cancelTask" onClick = {() => setIsEditMode(0)}>Cancel</button>
                <button className = "saveTask" onClick = {() => save()}>Save</button>
            </div>
        )
    }
    return (
        <div className = "taskContainer" onMouseEnter = {() => setIsTaskHovered(true)} onMouseLeave = {() => setIsTaskHovered(false)}>
            <input type = "checkbox" className = "checkBox" checked = {isChecked} onChange = {() => setIsChecked(!isChecked)}/>
            <p className = "taskDescription" onClick = {() => setIsEditMode(1)}>{desc}</p>
            {isTaskHovered && <img src={deleteIcon} alt="delete" className="icon" title="delete" onClick={() => deleteTask()}/>}
        </div>
    )
}
