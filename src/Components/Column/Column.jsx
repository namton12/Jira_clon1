import Task from 'Components/Task/Task'
import React from 'react'
import "./Column.scss"
export default function Column() {
  return (
    <div className='column'>
    <header>Brainstorm</header>
    <ul className='task-list'>
        <Task/>
        <Task/>
        <li className='task-item'>Hôm nay có cái gì đó ở Tôn Đức Nam</li>
        <li className='task-item'>Hôm nay có cái gì đó ở Tôn Đức Nam</li>
        <li className='task-item'>Hôm nay có cái gì đó ở Tôn Đức Nam</li>
        <li className='task-item'>Hôm nay có cái gì đó ở Tôn Đức Nam</li>
        <li className='task-item'>Hôm nay có cái gì đó ở Tôn Đức Nam</li>
    </ul>
    <footer>Thêm card mới</footer>
</div>
  )
}
