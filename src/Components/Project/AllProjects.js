import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchData from "../../ApiCalls";
import { allProjectsApi } from "../../ApiUrls";
import "./css/AllProjects.css";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetchData(allProjectsApi);
      console.log(response);
      setProjects(response.projectList);
      setHasFetched(true);
    })()
  }, [])

  if (!hasFetched) {
    return <div>Loading...</div>
  }

  if (projects.length === 0) {
    return (
      <>
        <h1>Sorry seems like you don't access to any project</h1>
        <h2>Create a new project <Link to="/addproject">here</Link></h2>
      </>
    )

  }
  return (
    <>
      <p className="heading">Chekout all the projects</p>
      <div>
        {projects.map(project => <ProjectCard {...project} id={project.id} />)}
      </div>
      <div className="addProject">
        <Link to="/add/project" className="addProjectLink">Add a new Project</Link>
      </div>
    </>
  )
}

const ProjectCard = ({ id, name, isPublic }) => {
  return (
    <Link to={`/project/${id}`} className="link">
      <div className="projectCard">
        <p className="name">{name}</p>
        <p className="public">{isPublic ? "Public" : "Private"}</p>
      </div>
    </Link >
  )
}

export default AllProjects;