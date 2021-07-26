import React, {useState} from 'react';

export default function Comment(props) {
    const save = () => {
        const text = document.querySelector(".commentText").value;
    }
    const [isEditMode, setIsEditMode] = useState(0);
    const [commentText, setCommentText] = useState(props.commentText);
    const [lastUpdated, setLastUpdated] = useState(props.lastUpdated);
    if (isEditMode) {
        return (
            <div>
                <textarea className = "inputBlocker">commentText</textarea>
                <button className = "save">Save</button>
                <button className = "delete">Cancel</button>
            </div>
        )
    }
    return (
        <div>
            <p className = "commentAuthor">{props.authorName}</p>
            <p className = "commentText">{commentText}</p>
            {props.isOwnComment && <button class = "save" onClick = {() => setIsEditMode(1)}>Edit</button>}
        </div>
    )
}
