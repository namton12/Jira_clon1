import Column from 'Components/Column/Column'
import React, {useState,useEffect} from 'react'
import "./BoardContent.scss"
import {initialData} from "actions/initialData";
import { isEmpty } from "lodash";
import {  mapOrder} from "utilities/sorts";
export default function BoardContent() {
  const [board , setBoard]=useState({})
  const [columns , setColumns]=useState({}) 

  useEffect(() => { 
    const boardFromDB = initialData.boards.find(board=>board.id === 'board-1')
    if(boardFromDB){
      setBoard(boardFromDB)
      
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder,'id'))
    }
   },[])
   if(isEmpty(board)){
      return <div className='not-found'>Board not found</div>
   }
  return (
    <div className='board-content'>
    {columns.map((column,index) => <Column key={index} column={column}/>)}

    </div>
  )
}
