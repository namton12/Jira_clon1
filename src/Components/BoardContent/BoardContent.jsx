import Column from 'Components/Column/Column'
import React, { useState, useEffect } from 'react'
import './BoardContent.scss'
import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import {Container as ContainerBoostrap, Row, Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { applyDrag } from 'utilities/dragDrop'
export default function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState({})

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])
  if (isEmpty(board)) {
    return <div className='not-found'>Board not found</div>
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id )
      setColumns(newColumns)
      console.log(currentColumn)
    }
  }
  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
  }
  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        getChildPayload={(index) => columns[index]}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className:'columns-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>

      <ContainerBoostrap className='trello-container'>
        <Row>
          <Col className='new-columns'><i className="fa fa-plus icon" />
        Thêm thẻ mới</Col>
        </Row>
        <Row>
          <Col className='enter-new-columns'>
            <Form.Control size="sm" type="text" placeholder="Enter columns title..." className='input-column'/>
            <Button variant="primary" size="sm" active>Thêm Cột Mới</Button>
            <span className='cancel-column'><FontAwesomeIcon icon={faXmark}  className='font-awesome'/></span>
          </Col>
        </Row>
      </ContainerBoostrap>
    </div>
  )
}
