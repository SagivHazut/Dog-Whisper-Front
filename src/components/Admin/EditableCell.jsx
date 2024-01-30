import React, { useState } from 'react'
import { updateTrainingDays } from '../../libs/UsersApi'

export const EditableCell = ({ value, sessionId, fetchAllUsers, user }) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(user.activity)
  const handleEdit = () => {
    setEditing(true)
  }
  const handleCancel = () => {
    setEditedValue(user.activity)
    setEditing(false)
  }

  const handleChange = (e) => {
    setEditedValue(e.target.value)
  }
  const handleSaveClick = async () => {
    const parsedUser = localStorage.getItem('user')
    const userToken = JSON.parse(parsedUser)
    if (!userToken) {
      console.error('User token not found')
      return
    }

    try {
      const updatedSession = {
        activity: editedValue,
        date: user.user,
        day: user.day,
        hour: user.hour,
        id: sessionId,
      }

      await updateTrainingDays(userToken, user.userId, [updatedSession])
      fetchAllUsers()

      setEditing(false)
    } catch (error) {
      console.error('Error saving training days:', error)
    }
  }

  return (
    <div className="px-6 py-4">
      {editing ? (
        <>
          <input
            type="text"
            value={editedValue}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <button onClick={handleSaveClick} className="ml-2">
            Save
          </button>
          <button onClick={handleCancel} className="ml-2">
            Cancel
          </button>
        </>
      ) : (
        <span onClick={handleEdit} className="cursor-pointer">
          {value}
        </span>
      )}
    </div>
  )
}
