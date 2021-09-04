import React, { useState, memo, useEffect } from 'react';
import TaskList from "../Task/TaskList";
import { storyState } from "../../Constants/Story";
import StoryInfo from "./StoryInfo";
import SavedBlocker from "../Blocker/SavedBlocker";
import BlockerList from "../Blocker/BlockerList";
import featureIcon from "../../Icons/feature.jpg";
import choreIcon from "../../Icons/feature.jpg";
import bugIcon from "../../Icons/feature.jpg";
import { storyType } from "../../Constants/Story";
import Comment from "../Comment/Comment";
import CommentList from '../Comment/CommentList';
import "./css/Story.css";
import fetchData from "../../ApiCalls";
import { getStoryApi } from "../../ApiUrls";


let setTaskList;
function Story(props) {
	const [story, setStory] = useState(props);
	const {
		id,
		title,
		points,
		type,
		state,
		ownerId,
		comments,
		tasks,
	} = story;
	const [isClicked, setIsClicked] = useState(props.isClicked);
	const [hasFetched, setHasFetched] = useState(false);
	const icon = type === storyType.feature ? featureIcon : (type === storyType.chore ? choreIcon : bugIcon);

  useEffect(() => {
    setStory(story => ({...story, members: props.members}));
  }, [props.members]);

	if (isClicked === 0) {
		return (
			<div class="collapsedStory" onClick={() => setIsClicked(1)}>
				<img src={icon} alt={storyType} className="icon" />
				<p className="storyTitle">{title}</p>
				<p className="storyPoints">{points}</p>
			</div>
		)
	}

	if (!hasFetched) {
		(async () => {
      var response = await fetchData(getStoryApi(id));
      setHasFetched(true);
			setStory({...response, members: props.members});
		})()
	}

	return (
		<div className="storyContainer">
			<StoryInfo {...story} setIsClicked={setIsClicked} />
			<CommentList storyId={id} />
		</div>
	)
}

export default Story;

			{/* <Comment
				commentText="comment text"
				lastUpdated={Date.now}
				authorName="Nikhil"
				isOwnComment={1}
			/> */}

{/* <TaskList taskList = {taskList}/> */ }
{/* <BlockerList blockerList = {blockerList}/> */ }
