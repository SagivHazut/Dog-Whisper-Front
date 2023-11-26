import React, { useState } from 'react'
import { updateTrainingDays } from '../libs/UsersApi'

export const EditableCalender = ({ user, closeModal, fetchAllUsers }) => {
  const [schedule, setSchedule] = useState(user?.trainingDays || [])

  const handleSave = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {}
      const userToken = storedUser.token

      if (!userToken) {
        console.error('User token not found')
        return
      }
      const filteredSchedule = schedule.filter(
        (item) => item.activity.trim() !== ''
      )
      await updateTrainingDays(userToken, filteredSchedule)

      fetchAllUsers()
      closeModal()
    } catch (error) {
      console.error('Error saving training days:', error)
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const days = [
    'Hours',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const getScheduleItem = (day, hour) => {
    return schedule.find((item) => item.day === day && item.hour === hour)
  }

  const handleInputChange = (day, hour, event) => {
    const newSchedule = [...schedule]
    const index = newSchedule.findIndex(
      (item) => item.day === day && item.hour === hour
    )
    if (index !== -1) {
      const trimmedValue = event.target.value.trim()
      if (trimmedValue === '') {
        newSchedule.splice(index, 1)
      } else {
        newSchedule[index].activity = trimmedValue
      }
    } else {
      const trimmedValue = event.target.value.trim()
      if (trimmedValue !== '') {
        newSchedule.push({ day, hour, activity: trimmedValue })
      }
    }

    setSchedule(newSchedule)
  }

  return (
    <div className="calendar-container">
      <h2 className="text-2xl font-bold mb-4">
        Edit {user?.firstName} {user?.lastName}'s Training Schedule
      </h2>

      <div className="scroll-container">
        <table className="calendar">
          <thead>
            <tr>
              {days.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="hour-cell">{`${hour}:00`}</td>

                {days.slice(0, -1).map((day, index) => {
                  const scheduleItem = getScheduleItem(day, hour)

                  return (
                    <td
                      key={index}
                      className={`calendar-cell ${
                        scheduleItem ? 'edited-cell' : ''
                      }`}
                    >
                      <input
                        type="text"
                        value={scheduleItem ? scheduleItem.activity : ''}
                        onChange={(event) =>
                          handleInputChange(day, hour, event)
                        }
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <style jsx>{`
        .calendar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
          overflow-x: auto;
        }

        h2 {
          margin-bottom: 10px;
        }

        .scroll-container {
          width: 100%;
          overflow-x: auto;
        }

        .calendar {
          border-collapse: collapse;
        }

        th,
        td {
          border: 1px solid #ddd;
          text-align: center;
        }

        th {
          background-color: #f2f2f2;
        }

        .hour-cell {
          background-color: #e6e6e6;
          font-weight: bold;
        }

        .calendar-cell {
          position: relative;
        }

        .edited-cell {
          background-color: #b3d9ff;
        }

        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .close-button {
          background-color: #ff6b6b;
          color: white;
          padding: 10px;
          margin-right: 10px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }

        .save-button {
          background-color: #63b3ed;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }

        @media (max-width: 600px) {
          .calendar {
            font-size: 8px;
          }
          th,
          td {
            padding: 1px;
          }
        }

        @media (min-width: 601px) {
          th,
          td {
            width: 10vw;
            padding: 3px;
          }
          .calendar {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  )
}
