import React from "react";
import { storyType as st } from "../../Constants/Story";
import Select from "./Select";

export default function StoryTable({
  members,
  type,
  points,
  requesterId,
  ownerId,
  lastUpdated,
  isAddStory,
}) {
  let pointsList = [];
  for (let i = 0; i < 6; i++) {
    pointsList.push({ value: i, key: i });
  }
  return (
    <>
      <div>
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
          className="requester"
          title="REQUESTER"
          itemList={members}
          selectedItem={requesterId}
        />}
        <Select
          className="owner"
          title="OWNER"
          itemList={members}
          selectedItem={ownerId}
        />
      </div>
    </>
  );
}
