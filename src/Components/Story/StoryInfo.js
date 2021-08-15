import React, { useState } from 'react';
import TaskList from "../Task/TaskList";
import StoryTable from "./StoryTable";
import "./css/StoryInfo.css";

let setTaskList;
function StoryInfo(props) {
	const deleteStory = () => {
		alert("Are you sure you want to delete this story");
	}
	console.log("ExpandedStory");
	const storyLinkTitle = "click to copy this story's link to your clipboard";
	const storyIdTitle = "click to copy this story's id to your clipboard";
	let {
		id,
		title,
		description,
		type,
		points,
		requesterId,
		ownerId,
		lastUpdated,
		setIsClicked
	} = props;

	return (
		<>
			<textarea className="storyTitle">{title}</textarea>
			<div className="storyInfo">
				<div className="firstRow">
					<div className="first">
						<span class="spans" title={storyLinkTitle}>storyLink</span>
						<span class="spans" title={storyIdTitle}>story id</span>
						<span>{id}</span>
					</div>
					<div className="second">
						<button className="delete" title="delete this story" onClick={() => deleteStory()}>Delete</button>
						<button className="collapse" title="collapse this story" onClick={() => setIsClicked(0)}>Collapse</button>
					</div>
				</div>
				<div className="storyTable">
					<StoryTable {...props} />
				</div>
				<textarea className="storyDescription">{description}</textarea>
			</div>
		</>
	)
}

export default StoryInfo;
