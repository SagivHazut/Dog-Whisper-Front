import React from 'react'
import { useDrop } from 'react-dnd'
import DraggableEditableCell from './DraggableEditableCell'

const DroppableCell = ({
  hour,
  day,
  onDropSession,
  onDropUser,
  trainingSchedule,
  handleRemoveUserFromSession,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['session', 'user'],
    drop: (item, monitor) => {
      if (monitor.getItemType() === 'user') {
        onDropUser(item.id, item.name, day, hour)
      } else if (monitor.getItemType() === 'session') {
        onDropSession(item.id, day, hour)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const session = trainingSchedule.find((s) => s.day === day && s.hour === hour)
  const isTrainingSession = !!session

  return (
    <td
      ref={drop}
      className={`calendar-cell ${
        isTrainingSession ? 'training-session' : ''
      } ${isOver ? 'over' : ''}`}
    >
      {isTrainingSession ? (
        <DraggableEditableCell
          session={session}
          handleSave={(newValue) => handleSave(session.id, newValue)}
          handleRemove={handleRemoveUserFromSession}
        />
      ) : null}
    </td>
  )
}

export default DroppableCell
