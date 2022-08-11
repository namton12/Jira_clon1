import React from 'react'
import './Card.scss'
export default function Task(props) {
  let { card } = props
  // console.log(props)
  return (
    <div className='card-item'>
      {card.cover && <img className='card-cover' src={card.cover} alt="" onMouseDown={e => e.preventDefault()}/>}
      {card.title}
    </div>
  )
}
