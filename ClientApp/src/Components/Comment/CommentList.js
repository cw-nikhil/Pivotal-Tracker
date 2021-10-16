import React, { useState, useEffect } from 'react';
import Comment from "./Comment";
import fetchData from '../../ApiCalls';
import { postCommentApi, getCommentsApi } from "../../ApiUrls";
import loader from "../../Icons/loader.gif";
import "./css/CommentList.css";

function CommentList({ storyId }) {
  const [shouldFetch, setShouldFetch] = useState(0);
  const [hasFetched, setHasFetched] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (document.querySelector(".newComment")) {
      document.querySelector(".newComment").value = "";
    }
  })

  const fetchComments = async () => {
    setShouldFetch(1);
    const response = await fetchData(getCommentsApi(storyId));
    if (response.comments && response.comments.length >= 0) {
      setComments(response.comments);
      console.log(response.comments);
    }
    setHasFetched(1);
  }
  const postComment = async () => {
    const commentText = document.querySelector(".newComment").value;
    const newComment = {
      text: commentText,
      storyId: storyId
    };
    try {
      const response = await fetchData(postCommentApi, "POST", newComment);
      if (response?.message) {
        alert(response.message);
      }
      else {
        setComments([...comments, { ...newComment, id: response.commentId }])
      }
    }
    catch (e) {
      alert("Some error submitting your comment. please try again");
    }
  }
  if (!shouldFetch || !hasFetched) {
    return (
      <button onClick={() => fetchComments()} className="loadComments">
        {!shouldFetch ? "Load Comments" : "Loading..."}
      </button>
    );
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
