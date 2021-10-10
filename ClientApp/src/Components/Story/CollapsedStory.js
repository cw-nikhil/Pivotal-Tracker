import React from 'react'

export default function CollapsedStory({id, title, points, type}) {
  return (
    <div>
      <p>id: {id}</p>
      <p>points: {points}</p>
      <p>title: {title}</p>
      <p>type: {type}</p>
      <p>Story endds</p>
      <br/><br/><br/><br/>
    </div>
  )
}
