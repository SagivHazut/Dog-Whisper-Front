import React from 'react'
import { useDrag } from 'react-dnd'
import { EditableCell } from '../EditableCell'

const DraggableEditableCell = ({ session, handleRemove, fetchAllUsers }) => {
  const [, drag] = useDrag(() => ({
    type: 'user',
    item: { id: session.userId, activity: session.activity },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        handleRemove(session.id)
      }
    },
  }))

  return (
    <div ref={drag} className="draggable-editable-cell">
      <EditableCell
        user={session}
        value={session.firstName + ' ' + session.lastName}
        fetchAllUsers={fetchAllUsers}
      />
    </div>
  )
}

export default DraggableEditableCell
