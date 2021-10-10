import React from "react";
import { storyType as st, storyStates } from "../../Constants/Story";
import Select from "./Select";

export default function StoryTable({
  members,
  type,
  points,
  requesterId,
  ownerId,
  lastUpdated,
  isAddStory,
  state,
}) {
  let pointsList = [];
  for (let i = 0; i < 6; i++) {
    pointsList.push({ value: i, key: i });
  }
  return (
    <>
      <div>
        <Select
          className="state"
          title="STATE"
          itemList={storyStates.map(x => ({key: x.state, value: x.stateId}))}
          selectedItem={state}
        />
        <Select
          className="type"
          title="STORY_TYPE"
          itemList={Object.entries(st).map(([key, value]) => ({ key, value }))}
          selectedItem={type}
        />
        <Select
          className="points"
          title="POINTS"
          itemList={pointsList}
          selectedItem={points}
        />
        {isAddStory || <Select
          className="requesterId"
          title="REQUESTER"
          itemList={members}
          selectedItem={requesterId}
        />}
        <Select
          className="ownerId"
          title="OWNER"
          itemList={members}
          selectedItem={ownerId}
        />
      </div>
    </>
  );
}
