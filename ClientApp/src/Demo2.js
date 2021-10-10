import React from 'react'

export default function Demo2({setJust, setText}) {
    return (
        <div>
            <button onClick = {() => {
                setJust(1);
                setText("second");
            }}>demo2</button>
        </div>
    )
}
