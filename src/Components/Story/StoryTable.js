import React from 'react';
import {storyType as st} from "../../Constants/Story";
import Select from "./Select";

export default function StoryTable({users, storyType, points, requester, lastUpdated}) {
    
    return (
        <>
            <div>
                {/* <span>STORY TYPE</span>
                <select>
                    {Object.entries(st).map(([key, val]) => {
                        return val === storyType ? <option selected>{key}</option> : <option>{key}</option>
                    })}
                </select> */}
                <Select title = "STORY_TYPE" itemList = {Object.entries(st).map(([key, val]) => key)} selectedItem = {storyType}/>
                <Select title = "POINTS" itemList = {[1, 2, 3, 4, 5]} selectedItem = {points}/>
                <Select title = "REQUESTER" itemList = {users} selectedItem = {requester}/>
                <p className = "lastUpdated">Last Updated on {lastUpdated}</p>
            </div>
        </>
    )
}
