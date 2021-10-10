import React, { memo, useState, useEffect } from 'react'


const userOb = {
	"email": "nik@codeforces.com",
	"password": "password"
};

const Just = ({ id }) => {
	const url = `http://localhost:5000/api/get/project/1`;
	// const url = "http://project-proton.herokuapp.com/api/get/project/1";

	// useEffect(() => {
	// 	fetch(url, {credentials: "include"})
	// 		.then(res => {
	// 			console.log(res);
	// 			return res.json();
	// 		})
	// 		.then(res => {
	// 			setProject(res);
	// 		})
	// }, [id, url])

	const [project, setProject] = useState({});
	if (Object.keys(project).length === 0) {
		return <><div onClick={() => Login({
			"email": "nik@codeforces.com",
			"password": "password"
		})}>Login</div>
		<div onClick = {() => getUser()}>get user</div>
		</>
	}
	return (
		<>
			<div>Project Name: {project.name}</div>
			<div>Project Name: {project.isPublic}</div>
			<div>Project OwnerId: {project.ownerId}</div>
			{project.stories.map((story, ind) => {
				return (
					<div key={ind}>
						<p>story title: {story.title}</p>
						<button onClick={() => Login({
							"email": "nik@codechef.com",
							"password": "password"
						})}>login</button>
					</div>
				);
			})}
			<button onClick={() => getUser()}>Get user</button>
		</>
	)
}

const addStory = async data => {
	const res = await fetch("http://localhost:5000/api/create/project", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
	}
	)
	// const a = res.json();
	console.log(await res.json());
}

const Login = async () => {
	const res = await fetch("http://localhost:5000/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userOb),
		credentials: "include",
	}
	)
	console.log(await res.json());
}

const getUser = async () => {
	await fetch("http://localhost:5000/api/user", { credentials: "include" })
		.then(res => res.json())
		.then(res => {
			console.log(res);
		})
}


export default memo(Just);

