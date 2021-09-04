import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";

import Just from "./Just";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import AddStory from "./Components/Story/AddStory";
import Project from "./Components/Project/Project";
import AllProjects from "./Components/Project/AllProjects";
import Header from "./Components/Header/Header";
import AddProject from "./Components/Project/AddProject";
import ProjectMembers from "./Components/Members/ProjectMembers";

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <Just id = "1"/>
//     <br/>
//     <br/>
//     <br/>
//     <Login />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
    <BrowserRouter>
      <Route path="/" component={Header} />
      <Route path="/login/" component={Login} />
      <Route path="/signup/" component={Signup} />
      <Route
        path="/add/Story/:id"
        component={(props) => <AddStory projectId={props.match.params.id} />}
      />
      <Route path="/project/:id" exact component={(id) => <Project id={1} />} />
      <Route path="/allprojects" component={AllProjects} />
      <Route path="/add/project" component={AddProject} />
      <Route path="/project/:id/members" component={props => <ProjectMembers projectId={props.match.params.id}/>} />
    </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
