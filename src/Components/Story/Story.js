import React, { useState } from 'react';
import TaskList from "../Task/TaskList";
import {storyState} from "../../Constants/Story";
import StoryInfo from "./StoryInfo";
import SavedBlocker from "../Blocker/SavedBlocker";
import BlockerList from "../Blocker/BlockerList";
import featureIcon from "../../Icons/feature.jpg";
import choreIcon from "../../Icons/feature.jpg";
import bugIcon from "../../Icons/feature.jpg";
import {storyType} from "../../Constants/Story";
import Comment from "../Comment/Comment";


let setTaskList;
function Story(props) {
    const [isClicked, setIsClicked] = useState(props.isClicked);
    const [title, setTitle] = useState(props.title);
    const [state, setState] = useState(props.state);
    const [type, setType] = useState(props.type);
    const [points, setpoints] = useState(props.points);
    const [description, setDescription] = useState(props.description);
    const [lastUpdatedOn, setLastUpdatedOn] = useState(props.lastUpdated);
    const {blockerList = [], taskList = [], users = [], createdOn = "today", commentList = []} = props;
    const icon = type === storyType.feature ? featureIcon : (type === storyType.chore ? choreIcon : bugIcon);

    if (isClicked === 0) {
        return (
            <div class = "collapsedStory" onClick = {() => setIsClicked(1)}>
                <img src = {icon} alt = {storyType} className = "icon"/>
                <p>{title}</p>
                <p>{points}</p>
            </div>
        )
    }

    return (
        <>
            <textarea className = "storyTitle">{title}</textarea>
            <br/><br/>
            <StoryInfo {...props} setIsClicked = {setIsClicked}/>
            <TaskList taskList = {taskList}/>
            <br/><br/>
            <BlockerList blockerList = {blockerList}/>
            <br/><br/>
            <Comment 
                commentText = "comment text"
                lastUpdated = {Date.now}
                authorName  = "Nikhil"
                isOwnComment = {1}
            />
        </>
    )
}

export default Story;
