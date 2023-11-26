import React, { useState } from 'react'

export const EditableCell = ({ value, handleSave }) => {
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const handleEdit = () => {
    setEditing(true)
  }

  const handleSaveClick = () => {
    handleSave(editedValue)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditedValue(value)
    setEditing(false)
  }

  const handleChange = (e) => {
    setEditedValue(e.target.value)
  }

  return (
    <td className="px-6 py-4">
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
    </td>
  )
}
