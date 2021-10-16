import React, { useState, useContext, useEffect } from 'react';
import TaskList from "../Task/TaskList";
import { storyState, storyStateOb, storyStates } from "../../Constants/Story";
import StoryInfo from "./StoryInfo";
import SavedBlocker from "../Blocker/SavedBlocker";
import BlockerList from "../Blocker/BlockerList";
import featureIcon from "../../Icons/feature.jpg";
import choreIcon from "../../Icons/chore.jpg";
import bugIcon from "../../Icons/bug.png";
import { storyType } from "../../Constants/Story";
import Comment from "../Comment/Comment";
import CommentList from '../Comment/CommentList';
import "./css/Story.css";
import fetchData from "../../ApiCalls";
import { getStoryApi, updateStoryApi } from "../../ApiUrls";
import { toggleContext } from '../Project/Project';


let setTaskList;
function Story(props) {
	const [story, setStory] = useState(props);
	const {
		id,
		title,
		points,
		type,
    state
	} = story;
	const [isClicked, setIsClicked] = useState(props.isClicked);
	const [hasFetched, setHasFetched] = useState(false);
	const icon = type === storyType.feature ? featureIcon : (type === storyType.chore ? choreIcon : bugIcon);
  const stateOb = storyStates.filter(x => x.stateId === state)[0];
  const unchangedValues = {
    id: id,
    state: -1,
    type: -1,
    points: -1,
    requesterId: -1,
    ownerId: -1,
  };
  const toggleState = useContext(toggleContext);

  const handleStateButtonClick = () => {
    fetchData(updateStoryApi, "PUT", {...unchangedValues, state: state + 1});
    if (state + 1 === storyStateOb.accepted) {
      toggleState(id, storyStateOb.accepted);
    }
    setStory(story => ({...story, state: story.state + 1}))
  }

  const handleStoryClick = e => {
    e.target.tagName !== "BUTTON" && setIsClicked(1);
    // console.log(e.target.tagName);
    // setIsClicked(1);
  }

  useEffect(() => {
    setStory(story => ({...story, members: props.members}));
  }, [props.members]);

	if (isClicked === 0) {
		return (
			<div class={`collapsedStory${state === storyStateOb.accepted ? " acceptedStory" : ""}`} onClick={(e) => handleStoryClick(e)}>
        <img src={icon} alt={storyType} className="icon" />
        <div title={`${points} points`} class="points">{Array(points).fill().map(() => (<hr></hr>))}</div>
				<p className="storyTitle">{title}</p>
        {story.state !== storyStateOb.accepted && <div className="stateButtonContainer">
          <button
            className={stateOb.buttonText.toLowerCase()}
            onClick={() => handleStateButtonClick()}
          >
            {stateOb.buttonText}
          </button>
        </div>}
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
			<StoryInfo story={story} setStory={setStory} setIsClicked={setIsClicked} />
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
