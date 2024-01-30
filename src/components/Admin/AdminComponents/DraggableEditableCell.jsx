import React from 'react'
import { useDrag } from 'react-dnd'
import { EditableCell } from '../EditableCell'

const DraggableEditableCell = ({ session, handleSave, handleRemove }) => {
  const [, drag] = useDrag(() => ({
    type: 'user',
    item: { id: session.userId, name: session.activity },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        handleRemove(session.id)
      }
    },
  }))

  return (
    <div ref={drag} className="draggable-editable-cell">
      <EditableCell
        value={session.activity}
        handleSave={(newValue) => handleSave(session.id, newValue)}
      />
    </div>
  )
}

export default DraggableEditableCell
