import React, { useState, useEffect } from 'react';
import Comment from "./Comment";
import fetchData from '../../ApiCalls';
import { postCommentApi, getCommentsApi } from "../../ApiUrls";

function CommentList({ storyId }) {
  const [shouldFetch, setShouldFetch] = useState(0);
  const [hasFetched, setHasFetched] = useState(0);
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    setShouldFetch(1);
    const response = await fetchData(getCommentsApi(storyId));
    if (response.comments && response.comments.length >= 0) {
      setComments(response.comments);
    }
    setHasFetched(1);
  }
  const postComment = async () => {
    const commentText = document.querySelector(".newComment").value;
    const newComment = {
      text: commentText,
      writerId: JSON.parse(localStorage.getItem("user")).id,
      storyId: storyId
    };
    const response = await fetchData(postCommentApi, "POST", newComment);
    if (response.commentId && response.commentId > 0) {
      setComments([...comments, newComment])
    }
    else {
      alert("Some error submitting your comment");
    }
  }
  if (!shouldFetch) {
    return (
      <button onClick={() => fetchComments()}>
        Load Comments
      </button>
    );
  }
  if (!hasFetched) {
    return <div>Loading...</div>
  }

  return (
    <div class="commentListContainer">
      {comments.map(comment => <Comment {...comment} />)}
      <textarea className="newComment"></textarea>
      <button onClick={() => postComment()}>Post</button>
    </div>
  )
}

export default CommentList
