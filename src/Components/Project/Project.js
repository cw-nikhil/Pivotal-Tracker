import React, { useState, useEffect } from 'react';
import fetchData from '../../ApiCalls';
import Story from "../Story/Story";
import ProjectHeader from './ProjectHeader';
import { getProjectApi, getUsersByProjectId } from '../../ApiUrls';
import CollapsedStory from '../Story/CollapsedStory';
import loader from "../../Icons/loader.gif";

const Project = ({ id }) => {
  const [project, setProject] = useState({});
  const [hasAcess, setHasAccess] = useState(1);
  
  console.log(project);
  useEffect(() => {
    (async () => {
      const response1 = await fetchData(getProjectApi(id));
      if(response1.success === 0) {
        setHasAccess(0);
        setProject({project: response1.project});
      }
      else {
        setProject(response1.project);
        const response2 = await fetchData(getUsersByProjectId(id));
        let members = response2.members;
        if (!members || members.length === 0) {
          return;
        }
        members = members.map(member => ({key: member.memberName, value: member.memberId}));
        setProject(project => ({...project, members: members}));
      }
    })();
  }, [id])

  if (Object.keys(project).length === 0) {
    return (
			<div className="loader">
				<img src={loader} alt="loader" />
			</div>
    )
  }

  if (!hasAcess) {
    return <p>{project.project}</p>
  }

  return (
    <div>
      <ProjectHeader name={project.name} id={1} activeTab="stories"/>
      {project.stories.map(story => <Story {...story} members={project.members} key = {story.id} isClicked = {0}/>)}
    </div>
  )
}
export default Project;