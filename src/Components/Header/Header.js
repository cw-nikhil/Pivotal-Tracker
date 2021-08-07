import React from 'react';
import { Link } from "react-router-dom";
import "./css/Header.css";
import fetchData from '../../ApiCalls';
import { logoutUrl } from '../../ApiUrls';

const logout = async () => {
  const response = await fetchData(logoutUrl, "POST");
  if (response.message === "user successfully logged out") {
    localStorage.clear("user");
    // location.reload();
  }
}

function Header({ activeTab }) {
  const user = JSON.parse(localStorage.getItem("user"));
  // const yourProjects = `/project/${id}`;
  // const membersUrl = `/project/${id}/members`;
  const allProjectsUrl = `/allprojects/`;
  const addProject = `/addproject`;
  return (
    <div className="header">
      <div className="headerNavigationMenu">
        <Link to={allProjectsUrl} className={`navigationTab${activeTab === "stories" ? " activeTab" : ""}`}>View all projects</Link>
        <Link to={addProject} className={`navigationTab${activeTab === "members" ? " activeTab" : ""}`}>Create project</Link>
        {UserTab(user)}
      </div>
    </div>
  )
}

const UserTab = user => {
  if (user) {
    return (
      <div className="userTab">
        <Link className="navigationTab" to={`/user/${user.id}`}>{user.name}</Link>
        <span className="navigationTab" onClick={() => logout()}>Logout</span>
      </div>
    );
  }
  return (
    <div className="userTab">
      <Link className="navigationTab" to="/login">Login</Link>
      <Link className="navigationTab" to="/login">Signup</Link>
    </div>
  )
}

export default Header
