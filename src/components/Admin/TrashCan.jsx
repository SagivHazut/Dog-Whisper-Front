import React from 'react'
import { useDrop } from 'react-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import '../../styles/CalendarControl.css'

const TrashCan = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'user',
    drop: (item, monitor) => {
      if (item.sessionId) {
        onDrop(item.sessionId)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div ref={drop} className={`trash-can ${isOver ? 'highlight' : ''}`}>
      <FontAwesomeIcon
        icon={faTrashAlt}
        size="2x"
        className={isOver ? 'open' : ''}
      />
    </div>
  )
}

export default TrashCan
