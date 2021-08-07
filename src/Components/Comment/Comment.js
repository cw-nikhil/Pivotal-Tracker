import React, { useState } from 'react';
import { Link } from "react-router-dom";
import fetchData from '../../ApiCalls';
import { updateCommentApi } from "../../ApiUrls";
import { deleteCommentApi } from "../../ApiUrls";
import "./css/Comment.css";

export default function Comment(props) {
    const currentUser = localStorage.getItem("user");
    const [isEditMode, setIsEditMode] = useState(0);
    const [isDeleted, setIsDeleted] = useState(0);
    const [text, setText] = useState("fksd flkds fk dskfl sdklf kdlf kld fkds fkd kf dskf sdlkf jdskf kdsf dskf kdsf klds fkds fs");

    const cancel = () => {
        setIsEditMode(0);
    }

    const save = e => {
        //api call
        setText(document.querySelector(".inputBlocker").value);
        setIsEditMode(0);
    }

    const deleteComment = () => {
        //call api
        setIsDeleted(1);
    }

    const commentFooter = isAuthor => {
        if (isAuthor) {
            return (
                <div className="commentsFooter">
                    <span class="save" onClick={() => setIsEditMode(1)}>Edit</span>
                    <span class="delete" onClick={() => {}}>Delete</span>
                    <span>You</span>
                </div>
            )
        }
        else {
            return <Link to={`/profile/${props.authorId}`} className="commentAuthor">Nikhil Rathore</Link>;
        }
    }

    if (isDeleted) {
        return null;
    }

    if (isEditMode) {
        return (
            <div>
                <textarea className="inputBlocker">{text}</textarea>
                <button className="save" onClick = {e => save(e)}>Save</button>
                <button className="delete" onClick = {() => cancel()}>Cancel</button>
            </div>
        )
    }

    if (currentUser !== props.writerId) {
        return (
            <div className="commentBox">
                <p className="commentText">{text}</p>
                {commentFooter(true)}
            </div>
        );
    }

}
