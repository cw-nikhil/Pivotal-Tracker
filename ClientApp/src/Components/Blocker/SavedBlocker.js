import React, {useState} from 'react';
import deleteIcon from "../../Icons/delete.png";
import featureIcon from "../../Icons/feature.jpg";

export default function SavedBlocker(props) {
    const [isEditMode, setIsEditMode] = useState(0);
    const [isResolved, setIsResolved] = useState(props.isResolved);
    const [desc, setDesc] = useState(props.desc);
    const [isDeleted, setIsDeleted] = useState(0);

    const save = () => {
        console.log("save");
        const text = document.querySelector(".inputBlocker").value;
        setDesc(text);
        setIsEditMode(0);
    }

    const onBlur = e => {
        const cn = e.relatedTarget?.className;
        if (cn !== "save" && cn != "delete") {
            setIsEditMode(0);
        }
    }

    if (isDeleted) {
        return null;
    }
    if (isEditMode) {
        return (
            <div>
                <textarea className = "inputBlocker" onBlur = {e => onBlur(e)} autoFocus>{desc}</textarea>
                <div className = "blockerButtons">
                    <button className = "save" onClick = {() => save()}>Save</button>
                    <button className = "delete" onClick = {() => setIsEditMode(0)}>Cancel</button>
                </div>
            </div>
        )
    }
    return (
        <div className = "blocker">
            <p className = "blockerText" onClick = {() => setIsEditMode(1)}>{desc}</p>
            <img className = "icon" src = {deleteIcon} alt = "deleteIcon" title = "Delete this story" onClick = {() => setIsDeleted(1)}/>
            <img className = "icon" src = {featureIcon} alt = "deleteIcon" title = "dfjks"/>
        </div>
    //     <>
    //     <div style = {{border: "1px solid black"}}>
    //         <p style = {{padding: "5px", border: "1px solid black"}}>lkdfjs fks dfkskf </p>
    //     </div>
    //     <br/>
    //     <div style = {{border: "1px solid black", paddingTop: "0px"}}>
    //         <p>lkdfjs fks dfkskf </p>
    //     </div>
    // </>
    )
}
