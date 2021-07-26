import React, {useState, useEffect} from 'react';

export default function AddBlocker({addBlocker}) {
    const [isClicked, setIsClicked] = useState(0);

    useEffect(() => {
        console.log("mounted");
        return () => {
            console.log("unmounted");
        }
    }, []);
    const add = () => {
        const text = document.querySelector(".inputBlocker")?.value;
        console.log(text);
        addBlocker(text);
        setIsClicked(0);
    };

    const onBlur = e => {
        const cn = e.relatedTarget.className;
        if (cn !== "save" && cn !== "delete") {
            setIsClicked(0);
        }
    }

    if (isClicked) {
        return (
            <div>
                <textarea className = "inputBlocker" placeholder = "Add Blocker" autoFocus onBlur = {(e) => onBlur(e)}></textarea>
                <div className = "blockerButtons">
                    <button className = "save" onClick = {() => add()}>Add Blocker</button>
                    <button className = "delete" onClick = {() => setIsClicked(0)}>Cancel</button>
                </div>
            </div> 
        )
    }
    return (
        <button className = "addBlocker" onClick = {() => setIsClicked(1)}>Add Blocker</button>
    )
}
