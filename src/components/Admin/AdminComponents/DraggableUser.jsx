import React from 'react'
import { useDrag } from 'react-dnd'

const DraggableUser = ({ user, session }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'user',
    item: {
      id: user._id,
      name: user.firstName + ' ' + user.lastName,
      sessionId: session ? session.id : null,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} className={`user-item ${isDragging ? 'dragging' : ''}`}>
      <div className="user-list-item">
        {user.firstName + ' ' + user.lastName}
      </div>
    </div>
  )
}

export default DraggableUser
