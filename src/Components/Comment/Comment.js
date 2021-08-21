import React, { useState } from 'react';
import { Link } from "react-router-dom";
import fetchData from '../../ApiCalls';
import { updateCommentApi } from "../../ApiUrls";
import { deleteCommentApi } from "../../ApiUrls";
import { getUserFromCookie } from '../../Utils';
import "./css/Comment.css";

export default function Comment(props) {
    const currentUser = getUserFromCookie();
    const [isEditMode, setIsEditMode] = useState(0);
    const [isDeleted, setIsDeleted] = useState(0);
    const [text, setText] = useState(props.text);

    const cancel = () => {
        setIsEditMode(0);
    }

    const save = async e => {
        const updatedText = document.querySelector(".inputBlocker").value;
        try {
            const body = {
                id: props.id,
                text: updatedText,
                writerId: props.writerId
            };
            const response = await fetchData(updateCommentApi, "PUT", body);
            if (response?.message === "comment updated successfully") {
                setText(updatedText);
                setIsEditMode(0);
            }
            alert(response?.message);

        }
        catch (e) {
            alert("Some error occured while saving your comment. Please try again");
        }
    }

    const deleteComment = async () => {
        try {
            const body = {
                id: props.id,
                writerId: props.writerId,
            };
            const response = await fetchData(deleteCommentApi, "DELETE", body);
            if (response?.message === "comment deleted successfully") {
                setIsDeleted(1);
            }
            alert(response?.message);
        }
        catch (e) {
            alert("Some error occured while deleting your comment. Please try again");
        }
    }

    const commentFooter = isAuthor => {
        if (isAuthor) {
            return (
                <div className="commentsFooter">
                    <span class="save" onClick={() => setIsEditMode(1)}>Edit</span>
                    <span class="delete" onClick={() => deleteComment()}>Delete</span>
                    <span>You</span>
                </div>
            )
        }
        else {
            return <Link to={`/profile/${props.authorId}`} className="commentAuthor">{props.writerName}</Link>;
        }
    }

    if (isDeleted) {
        return null;
    }

    if (isEditMode) {
        return (
            <div>
                <textarea className="inputBlocker">{text}</textarea>
                <button className="save" onClick={e => save(e)}>Save</button>
                <button className="delete" onClick={() => cancel()}>Cancel</button>
            </div>
        )
    }

    return (
        <div className="commentBox">
            <p className="commentText">{text}</p>
            {commentFooter(currentUser.id === props.writerId)}
        </div>
    );


}
