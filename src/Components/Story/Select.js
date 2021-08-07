import React from 'react';
import "./css/Select.css";

export default function Select({title, itemList = [], selectedItem}) {
    return (
        <div className = "select">
            <span class="selectTitle">{title}</span>
            <select>
                {itemList.map(item => item === selectedItem ? <option selected>{item}</option> : <option>{item}</option>)}
            </select>
        </div>
    )
}
