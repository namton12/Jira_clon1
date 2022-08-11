import Card from 'Components/Card/Card'
import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'
export default function Column(props) {
  let { column, onCardDrop } = props
  let cards = mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <div className='column'>
      <header className='column-drag-handle'>{column.title}</header>
      <div className='card-list'>
        <Container
          groupName="col-columns"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          onDropReady={p => console.log('Drop ready: ', p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card) => (
            <Draggable key={card.id}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>

      </div>
      <footer>
        <div className='footer-actions'>
          <i className='fa fa-plus icon'/>Thêm thẻ mới
        </div>

      </footer>
    </div>
  )
}
