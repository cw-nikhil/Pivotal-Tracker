import React, { useState, useEffect } from "react";
import fetchData from "../../ApiCalls";
import { addProjectApi } from "../../ApiUrls";
import { Link } from "react-router-dom";
import TextArea from "../TextArea/TextArea";
import { ArrowSvg } from "../Svg/ArrowSvg";
import "./css/AddProject.css";

let projectId = 0;
export default function AddProject() {
  const [isCreated, setIsCreated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  let isPublic = true;
  const createProject = async () => {
    if (isCreating) {
      return;
    }
    const name = document.querySelector("textarea").value;
    if (!name || name.length > 100) {
      alert(!name ? "project name cannot be empty" : "character length should be less than 100");
      return;
    }
    setIsCreating(true);
    const response = await fetchData(addProjectApi, "POST", {
      name,
      isPublic,
    });
    if (response?.projectId) {
      projectId = response.projectId;
      document.querySelector("textarea").value = "";
      setIsCreated(true);
    }
    else {
      alert(response?.message ?? "server didn't respond");
    }
    setIsCreating(false);
  };

  const handleClick = (e) => {
    const el = e.target;
    isPublic =
      el ===
      document.querySelector(
        ".addProjectContainer .radioButtons > p:nth-child(1)"
      );
    console.log("isPublic", isPublic);
    el.style.border = "2px solid purple";
    document.querySelector(
      `.addProjectContainer .radioButtons > p:nth-child(${isPublic ? 2 : 1})`
    ).style.border = "none";
  };

  useEffect(() => {
    document.querySelector("textarea").focus();
    document.querySelector(".textareaBottom > span").innerHTML = "100/100";
  });

  return (
    <>
      <div className="addProjectContainer">
        <div>
          {isCreated && (
            <p className="message">
              Project successfully created. Click{" "}
              <Link to={`/project/${projectId}`}>here</Link> to see
            </p>
          )}
          <div>
            <p className="text">Project Name</p>
            <TextArea charLimit={100} />
          </div>
          <p className="text">Set the accessibility of your project</p>
          <div className="radioButtons">
            <p onClick={handleClick}>
              Public
            </p>
            <p onClick={handleClick}>
              Private
            </p>
          </div>
          <div className={`submit ${isCreating ? "submitDisable" : ""}`} onClick={() => createProject()}>
            {isCreating ? "Creating..." : <>
            Create Project
            <ArrowSvg dirClass="right" /></>}
          </div>
        </div>
      </div>
    </>
  );
}
