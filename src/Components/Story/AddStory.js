import React, {useState} from 'react';
import Modal from "react-modal";
import Story from "./Story";

export default function AddStory() {
    const [isOpen, setIsOpen] = useState(0);
    const saveStory = () => {
        setIsOpen(0);
    }
    return (
        <div>
            <button onClick = {() => setIsOpen(true)}>Add Story</button>
            <Modal isOpen = {isOpen}>
                <Story isClicked = {1}/>
                <button className = "save" onClick = {() => saveStory()}>Add3</button>
            </Modal>
        </div>
    )
}
