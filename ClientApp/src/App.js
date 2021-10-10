 
import logo from './logo.svg';
import './App.css';
import Just from "./Just";
import {useState, useEffect} from "react";
import Story from "./Components/Story/Story";
import {storyStates, storyType} from "./Constants/Story";
import AddStory from "./Components/Story/AddStory";
// import deleteIcon from "./Icons/delete.png";
// import choreIcon from "./Icons/chore.jpg";


// import Demo1 from "./Demo1";
// import Demo2 from "./Demo2";

function App() {
	console.log("App");
	let taskList = [
		{
			id: 1,
			isChecked: false,
			desc: "first",
			isFirst: true,
			isLast: false,
		},
		{
			id: 2,
			isChecked: false,
			desc: "second",
			isFirst: false,
			isLast: false,
		},
		{
			id: 3,
			isChecked: false,
			desc: "third",
			isFirst: false,
			isLast: false
		},
		{
			id: 4,
			isChecked: false,
			desc: "fourth",
			isFirst: false,
			isLast: true
		},
	];

	const users = [
		{
			id: 1,
			name: "First"
		},
		{
			id: 2,
			name: "Second"
		},
		{
			id: 3,
			name: "Third"
		}
	]
	document.title = "hey";
	const props = {
		title: "[Css Framework] - Remove remaining unnecessary usage of extra css added.",
		id: 5346436,
		state: storyStates.finished,
		storyType: storyType.feature,
		points: 2,
		requester: "Random",
		owner: "owner",
		blockerList: [{desc: "first blocker", isResolved: 0}, {desc: "second blocker", isResolved: 0}],
		createdOn: "date",
		description: "this is just some random description",
		taskList: taskList,
		users: ["Nikhil", "Amit", "Bharat"],
		lastUpdated: "time"
	};


	const [just, setJust] = useState(1);
	const [text, setText] = useState("first");
	return (
		<>
			<AddStory/>
			<p>kfjsdkf</p>
			<Story {...props}/>
		</>

		// <>
		// 	<Demo1 text = {text} setJust = {setJust}/>
		// 	<Demo2 setJust = {setJust} setText = {setText}/>
		// </>
	);
}

export default App;







// return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Final Space Characters</h1>
//         <DragDropContext>
//           <Droppable droppableId="characters">
//             {(provided) => (
//               <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
// 				{a.map((e, i) => {
// 					return <Draggable key = {i} draggableId={i + "1"} index={i}>
// 						{provided => <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="just">{e}</li>}
// 						</Draggable>
// 				})}

//                 {provided.placeholder}
//               </ul>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </header>
//       <p>
//         Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
//       </p>
//     </div>
//   );