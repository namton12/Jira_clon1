import React from 'react'
import './Card.scss'
export default function Task(props) {
  let {card} = props;
   console.log(props)
  return (
    <li className='card-item'>
       {card.cover && <img className='card-cover' src={card.cover} alt="" />}
           {card.title}
        </li>
  )
}
