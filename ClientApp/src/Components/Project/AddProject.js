import React, { useState } from "react";
import fetchData from "../../ApiCalls";
import { addProjectApi } from "../../ApiUrls";
import { Link } from "react-router-dom";

let projectId = 0;
export default function AddProject() {
  const [isCreated, setIsCreated] = useState(false);
  const createProject = async () => {
    const name = document.getElementById("name").value;
    const isPublic = document.getElementById("public").checked;
    const response = await fetchData(addProjectApi, "POST", {
      name,
      isPublic
    })
    if (response?.projectId) {
      projectId = response.projectId;
      document.getElementById("name").value = "";
      setIsCreated(true);
    }
    else {
      alert(response?.message ?? "server didn't respond");
    }
  }
  return (
    <>
      {isCreated && (
        <p>Project successfully created. Click <Link to={`/project/${projectId}`}>here</Link> to see</p>
      )}
      <div>
        <label htmlFor="name">project name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="private">public</label>
        <input type="radio" value="1" name="access" id="public" defaultChecked/>
      </div>
      <div>
        <label htmlFor="private">private</label>
        <input type="radio" value="0" name="access" id="private" />
      </div>
      <button onClick={() => createProject()}>Create Project</button>
    </>
  );
}
