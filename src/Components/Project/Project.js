import React, { useState, useEffect } from 'react';
import fetchData from '../../ApiCalls';
import Story from "../Story/Story";
import ProjectHeader from './ProjectHeader';
import { getProjectApi } from '../../ApiUrls';
import CollapsedStory from '../Story/CollapsedStory';
import loader from "../../Icons/loader.gif";

const Project = ({ id }) => {
  const [project, setProject] = useState({});
  const [hasAcess, setHasAccess] = useState(1);
  
  console.log(project);
  useEffect(() => {
    (async () => {
      const response = await fetchData(getProjectApi(id));
      console.log(response);
      if(response.success === 0) {
        setHasAccess(0);
        setProject({project: response.project});
      }
      else {
        setProject(response.project);
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
      {project.stories.map(story => <Story {...story} key = {story.id} isClicked = {0}/>)}
    </div>
  )
}
export default Project;