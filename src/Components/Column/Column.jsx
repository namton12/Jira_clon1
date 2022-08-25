import Card from 'Components/Card/Card'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'
import { Dropdown, Form, Button } from 'react-bootstrap'
import ConfigModal from 'Components/Modal/ConfigModal'
import { cloneDeep } from 'lodash'
import {  MODAL_ACTION_CONFIRM } from 'Redux/type/ConfirmType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Column(props) {
  let { column, onCardDrop, onUpdateColumn } = props
  let cards = mapOrder(column.cards, column.cardOrder, 'id')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [newCard, setNewCard] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')
  useEffect(() => { setColumnTitle(column.title) }, [column.title])
  useEffect(() => {
    if (newCardTextarea && newCardTextarea.current) {
      newCardTextarea.current.focus()
      newCardTextarea.current.select()
    }
  }, [newCard])
  //xử lý CardForm
  const newCardTextarea = useRef(null)
  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitle = useCallback((e) => setNewCardTitle(e.target.value))
  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextarea.current.focus()
      return
    }
    const newCardAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover:null
    }
    let newColumn = cloneDeep(column)
    newColumn.cards.push(newCardAdd)
    newColumn.cardOrder.push(newCardAdd.id)
    onUpdateColumn(newColumn)
    setNewCardTitle('')
    setNewCard(!newCard)
  }
  //xử lý columnFormControl
  const handleColumnTitle = useCallback((e) => setColumnTitle(e.target.value), [])
  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
    console.log(columnTitle)
  }
  const onConfirmAction = (type) => {
    //  console.log(action)
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    setShowConfirmModal(!showConfirmModal)
  }
  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column-title'>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Enter columns title..."
            className='Clone-trello'
            value={columnTitle}
            spellCheck='false'
            onClick={(e) => {
              e.target.focus()
              e.target.select()
              document.execCommand('selectAll', false, null)
            }}
            onChange={handleColumnTitle}
            onBlur={handleColumnTitleBlur}
            onMouseDown={event => event.preventDefault()}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.target.blur()
              }
            }}
          />
        </div>
        <div className='column-dropdown'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size='sm' className='dropdown-button' />
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>{ setNewCard(!newCard) }}>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={() => { setShowConfirmModal(!showConfirmModal) }}>Remove columns...</Dropdown.Item>
              <Dropdown.Item >Move all cards in this list...</Dropdown.Item>
              <Dropdown.Item >Archive All Cards in this list ...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
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
        {newCard &&
          <div className='add-new-card-area'>
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter Card title..."
              className='input-column'
              ref={newCardTextarea}
              value={newCardTitle}
              onChange={onNewCardTitle}
              onKeyDown={(event) => { event.key === 'Enter' && addNewCard() }}
            />
          </div>
        }
      </div>

      <footer>
        {newCard &&
        <div className='add-new-card-areas'>
          <Button onClick={addNewCard} variant="primary" size="sm" active style={{ margin: '5px 1px' }}>Thêm Thẻ Mới</Button>
          <span className='cancel-column' onClick={() => { setNewCard(!newCard) }}><FontAwesomeIcon icon={faXmark} className='font-awesome' /></span>
        </div>
        }
        { !newCard &&
          <div className='footer-actions' onClick={() => {
            setNewCard(!newCard)
          }}>
            <i className='fa fa-plus icon' />Thêm thẻ mới
          </div>
        }
      </footer>
      <ConfigModal
        show={showConfirmModal}
        onAction={onConfirmAction}
        title='Remove columns'
        content={`You want to remove columns <strong>${column.title}</strong>!`}
      />
    </div>
  )
}
