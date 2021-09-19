import React, { useState, createContext, useEffect } from 'react';
import TaskList from "../Task/TaskList";
import StoryTable from "./StoryTable";
import { storyStates } from '../../Constants/Story';
import fetchData from '../../ApiCalls';
import { updateStoryApi } from '../../ApiUrls';
import "./css/StoryInfo.css";

let setTaskList;
export const handlerContext = createContext();

function StoryInfo(props) {
  const { story, setStory, setIsClicked } = props;
	const deleteStory = () => {
		alert("Are you sure you want to delete this story");
	}
	console.log("ExpandedStory");
	const storyLinkTitle = "click to copy this story's link to your clipboard";
	const storyIdTitle = "click to copy this story's id to your clipboard";
  const unchangedValues = {
    id: story.id,
    state: -1,
    type: -1,
    points: -1,
    requesterId: -1,
    ownerId: -1,
  };

  const handleTableValueChange = selectClass => {
    const value = parseInt(document.querySelector(`.${selectClass}`).value);
    let changedParam = {}
    changedParam[selectClass] = value;
    fetchData(updateStoryApi, "PUT", {...unchangedValues, ...changedParam});
    setStory({...story, ...changedParam});
  }

  const handleStateButtonClick = () => {
    fetchData(updateStoryApi, "PUT", {...unchangedValues, state: story.state + 1});
    setStory(story => ({...story, state: story.state + 1}))
  }
  
	let {
		id,
		title,
		description,
    state,
	} = story;

  const stateOb = storyStates.filter(x => x.stateId === state)[0];

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
        <div className="stateButtonContainer">
          <button
            className={stateOb.buttonText.toLowerCase()}
            onClick={() => handleStateButtonClick()}
          >
            {stateOb.buttonText}
          </button>
        </div>
				<div className="storyTable">
          <handlerContext.Provider value={handleTableValueChange}>
					  <StoryTable {...story}/>
          </handlerContext.Provider>
				</div>
				<textarea className="storyDescription">{description}</textarea>
			</div>
		</>
	)
}

export default StoryInfo;
