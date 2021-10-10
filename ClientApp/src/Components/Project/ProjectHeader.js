import React from 'react';
import { Link } from "react-router-dom";
import "./css/ProjectHeader.css";

function ProjectHeader({ id, name, activeTab, setIsAddStoryClicked }) {
  const user = { name: "Nikhil Rathore", id: 44 };
  const storiesUrl = `/project/${id}`;
  const membersUrl = `/project/${id}/members`;
  return (
    <div className="projectHeader">
      <p className="projectName">{name}</p>
      <div className="navigationMenu">
        <Link to={storiesUrl} className={`navigationTab${activeTab === "stories" ? " activeTab" : ""}`}>Stories</Link>
        <Link to={membersUrl} className={`navigationTab${activeTab === "members" ? " activeTab" : ""}`}>Members</Link>
        {UserTab(id, setIsAddStoryClicked)}
      </div>
    </div>
  )
}

const UserTab = (id, setIsAddStoryClicked) => {
  return (
    <div className="addstory">
       <p className="navigationTab" to={`/add/story/${id}`} onClick={() => setIsAddStoryClicked(1)}>Add story</p>
    </div>
  )
  // if (user) {
  //   return (
  //     <div className="userTab">
  //       <Link className="navigationTab" to={`/user/${user.id}`}>{user.name}</Link>
  //       <Link className="navigationTab" to={`/logout`}>Logout</Link>
  //     </div>
  //   );
  // }
  // return (
  //   <div className="userTab">
  //     <Link className="navigationTab" to="/login">Login</Link>
  //     <Link className="navigationTab" to="/login">Signup</Link>
  //   </div>
  // )
}

export default ProjectHeader
