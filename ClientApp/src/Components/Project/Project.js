import React, { useState, useEffect, createContext } from "react";
import fetchData from "../../ApiCalls";
import Story from "../Story/Story";
import ProjectHeader from "./ProjectHeader";
import { getProjectApi, getUsersByProjectId } from "../../ApiUrls";
import loader from "../../Icons/loader.gif";
import AddStory from "../Story/AddStory";
import { storyStateOb, storyStates } from "../../Constants/Story";
import { ArrowSvg } from "../Svg/ArrowSvg";
import "./css/Project.css";

export const toggleContext = createContext();

const Project = ({ id }) => {
  const [project, setProject] = useState({});
  const [hasAcess, setHasAccess] = useState(1);
  const [isAddStoryClicked, setIsAddStoryClicked] = useState(false);
  const [shouldShowAccepted, setShouldShowAccepted] = useState(false);
  console.log(project);
  useEffect(() => {
    (async () => {
      const response1 = await fetchData(getProjectApi(id));
      if (response1.success === 0) {
        setHasAccess(0);
        setProject({ project: response1.project });
      } else {
        setProject(response1.project);
        const response2 = await fetchData(getUsersByProjectId(id));
        let members = response2.members;
        if (!members || members.length === 0) {
          return;
        }
        members = members.map((member) => ({
          key: member.memberName,
          value: member.userId,
        }));
        members = [
          {
            key: "None",
            value: 0,
          },
          ...members,
        ];
        setProject((project) => ({ ...project, members: members }));
      }
    })();
  }, [id]);

  if (Object.keys(project).length === 0) {
    return (
      <div className="loader">
        <img src={loader} alt="loader" />
      </div>
    );
  }

  if (!hasAcess) {
    return <p>{project.project}</p>;
  }

  const acceptedStories = project.stories.filter(
    (x) => x.state === storyStateOb.accepted
  );

  const toggleState = (storyId, newState) => {
    console.log(storyId);
    const stories = Array.from(project.stories);
    for (let i = 0; i < stories.length; i++) {
      if (stories[i].id === storyId) {
        stories[i].state = newState;
        break;
      }
    }
    setProject((project) => ({ ...project, stories }));
  };
  return (
    <div>
      {isAddStoryClicked && (
        <AddStory
          projectId={id}
          setIsAddStoryClicked={setIsAddStoryClicked}
          members={project.members}
        />
      )}
      <ProjectHeader
        name={project.name}
        id={1}
        activeTab="stories"
        setIsAddStoryClicked={setIsAddStoryClicked}
      />
      <toggleContext.Provider value={toggleState}>
        {acceptedStories && acceptedStories.length > 0 && (
          <div className="acceptedStories">
            <p onClick={() => setShouldShowAccepted(!shouldShowAccepted)}>
              {`${shouldShowAccepted ? "Hide" : "Show"} ${
                acceptedStories.length
              } accepted ${acceptedStories.length > 1 ? "stories" : "story"}`}
              <ArrowSvg dirClass={shouldShowAccepted ? "up": "down"}/>
            </p>
            {shouldShowAccepted && (
              <div>
                {acceptedStories.map((story) => (
                  <Story
                    {...story}
                    members={project.members}
                    key={story.id}
                    isClicked={0}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {project.stories
          .filter((x) => x.state != storyStateOb.accepted)
          .map((story) => (
            <Story
              {...story}
              members={project.members}
              key={story.id}
              isClicked={0}
            />
          ))}
      </toggleContext.Provider>
    </div>
  );
};
export default Project;
