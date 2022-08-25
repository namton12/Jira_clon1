import Column from 'Components/Column/Column'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import './BoardContent.scss'
import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as ContainerBoostrap, Row, Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { applyDrag } from 'utilities/dragDrop'
export default function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState({})
  const [newColumns, setNewColumns] = useState(false)
  const newColumnsInput = useRef(null)
  const [newColumnsTitle, setNewColumnsTitle] = useState('')
  const onNewColumnTitle = useCallback((e) => setNewColumnsTitle(e.target.value))
  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])
  useEffect(() => {
    if (newColumnsInput && newColumnsInput.current) {
      newColumnsInput.current.focus()
      newColumnsInput.current.select()
    }
  }, [newColumns])
  if (isEmpty(board)) {
    return <div className='not-found'>Board not found</div>
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
      setColumns(newColumns)
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
  const addNewColumns = () => {
    if (!newColumnsTitle) {
      newColumnsInput.current.focus()
      return
    }
    const newColumnsAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnsTitle.trim(),
      cardOrder: [],
      cards: []
    }
    let newColumns = [...columns]
    newColumns.push(newColumnsAdd)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
  }
  const onUpdateColumn = (newColumnUpdate) => {
    const columnIdToUpdate = newColumnUpdate.id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)
    if (newColumnUpdate._destroy) {
      //remove
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      //update
      newColumns.splice(columnIndexToUpdate, 1, newColumnUpdate)
    }
    //  console.log(columnIndexToUpdate)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
  }
  const onAddNewCardColumn = (newColumn) => {

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
          className: 'columns-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn} />
          </Draggable>
        ))}
      </Container>
      <ContainerBoostrap className='trello-container'>
        {!newColumns &&
          <Row>
            <Col onClick={() => { setNewColumns(!newColumns) }} className='new-columns'><i className="fa fa-plus icon" />
              Thêm thẻ mới</Col>
          </Row>
        }
        {newColumns &&
          <Row>
            <Col className='enter-new-columns'>
              <Form.Control size="sm" type="text" placeholder="Enter columns title..." className='input-column' ref={newColumnsInput} value={newColumnsTitle} onChange={onNewColumnTitle} onKeyDown={(event) => { event.key === 'Enter' && addNewColumns() }} />
              <Button onClick={addNewColumns} variant="primary" size="sm" active>Thêm Cột Mới</Button>
              <span onClick={() => {
                setNewColumns(!newColumns)
              }} className='cancel-column'><FontAwesomeIcon icon={faXmark} className='font-awesome' /></span>
            </Col>
          </Row>
        }
      </ContainerBoostrap>
    </div>
  )
}
