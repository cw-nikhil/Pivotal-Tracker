import React, { useState } from 'react';
import TaskList from "../Task/TaskList";
import StoryTable from "./StoryTable";

let setTaskList;
function StoryInfo(props) {
    console.log("ExpandedStory");
    let {
        id,
        storyType,
        points,
        requester,
        owner,
        lastUpdated,
        setIsClicked
    } = props;

    return (
        <div className = "storyInfo">
            <div className = "firstRow">
                <div className = "first">
                    <span>storyLink</span>
                    <span>story id</span>
                    <span>{id}</span>
                </div>
                <div className = "second">
                    <button className = "delete" title = "delete this story">Delete</button>
                    <button onClick = {() => setIsClicked(0)} className = "collapse">Collapse</button>
                </div>
            </div>
            <div className = "storyTable">
                <StoryTable {...props}/>
            </div>
        </div>
    )
}

export default StoryInfo;
