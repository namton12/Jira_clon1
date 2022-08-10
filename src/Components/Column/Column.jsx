import Card from 'Components/Card/Card'
import React from 'react'
import "./Column.scss"
import {  mapOrder} from "utilities/sorts";
export default function Column(props) {
  let {column}= props;
  let cards=mapOrder(column.cards,column.cardOrder,'id')
  
  return (
    <div className='column'>
    <header>{column.title}</header>
    <ul className='card-list'>
      {cards.map((card,index) => <Card key={card.id} card={card}/> )}
    
        
    </ul>
    <footer>Thêm card mới</footer>
</div>
  )
}
