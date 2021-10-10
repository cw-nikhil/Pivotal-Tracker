import React from 'react';
import SavedBlocker from "./SavedBlocker";
import AddBlocker from "./AddBlocker";
import {useState} from "react";

export default function BlockerList(props) {
    const [blockerList, setBlockerList] = useState(props.blockerList);
    const addBlocker = desc => {
        const newBlocker = {
            desc: desc,
            isResolved: 0
        };
        setBlockerList([...blockerList, newBlocker]);
    }
    return (
        <div>
            {blockerList.map(blocker => <SavedBlocker {...blocker}/>)}
            <AddBlocker addBlocker = {addBlocker}/>
        </div>
    )
}
