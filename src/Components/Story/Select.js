import React from 'react'

export default function Select({title, itemList = [], selectedItem}) {
    return (
        <div className = "select">
            <span>{title}</span>
            <select>
                {itemList.map(item => item === selectedItem ? <option selected>{item}</option> : <option>{item}</option>)}
            </select>
        </div>
    )
}
