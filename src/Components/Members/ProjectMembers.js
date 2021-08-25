import React, { useState, useEffect } from "react";
import "./css/ProjectMembers.css";
import { getUserFromCookie } from "../../Utils";
import { getUsersByProjectId } from "../../ApiUrls";
import fetchData from "../../ApiCalls";
import loader from "../../Icons/loader.gif";

const img = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";

const removeMember = () => {

}
const leaveProject = () => {

}

const loggedInUser = getUserFromCookie() || {};
let ownerId;

const ProjectMembers = ({ projectId }) => {
	const [members, setMembers] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [message, setMessage] = useState("");
	// const [ownerId, setOwnerId] = useState(0);
	useEffect(() => {
		(async () => {
			const response = await fetchData(getUsersByProjectId(projectId));
			if (response.members) {
				setMembers(response.members);
				ownerId = response.ownerId;
				// setOwnerId(response.ownerId);
				console.log(ownerId);
			}
			else {
				setMessage(response.message ?? "Server Error");
			}
			setIsFetching(false);
		})()
	}, [projectId]);
	if (isFetching) {
		return (
			<div className="loader">
				<img src={loader} alt="loader" />
			</div>
		)
	}
	if (message) {
		return <p>{message}</p>
	}
	console.log(ownerId);
  return (
		<div class="container">
			<ul>{members.map(member => <MemberCard {...member} key={member.userId}/>)}</ul>
		</div>
	)
}

const MemberCard = ({userId, email, memberName, imgUrl}) => {
	return (
		<div className="memberCard">
			<div className="memberInfo">
				<div>
					<img src={img} alt="nik"/>
				</div>
				<div>
					<p className="memberName">{memberName}</p>
					<p className="email">{email}</p>
				</div>
			</div>
			<div className="memberType">
				<p>{ownerId === userId ? "Owner" : "Member"}</p>
				{loggedInUser.id === userId && <button>Leave</button>}
				{loggedInUser.id === ownerId && userId !== ownerId && <button>Remove</button>}
			</div>
		</div>
	)
}

export default ProjectMembers;