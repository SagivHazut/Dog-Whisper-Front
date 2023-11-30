import React, { useState } from 'react'
import {
  updateTrainingDays,
  updatePreviousTrainingDays,
} from '../libs/UsersApi'

export const EditableCalender = ({ user, closeModal, fetchAllUsers }) => {
  const [schedule, setSchedule] = useState(user?.trainingDays || [])

  const getDayDate = (dayIndex) => {
    const currentDate = new Date()
    const todayIndex = currentDate.getDay()
    const difference = dayIndex - todayIndex
    const targetDate = new Date(currentDate)
    targetDate.setDate(currentDate.getDate() + difference + 1)
    return targetDate.toISOString().split('T')[0]
  }

  const handlerClear = async () => {
    setSchedule([])
  }

  const handleSave = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {}
      const userToken = storedUser.token

      if (!userToken) {
        console.error('User token not found')
        return
      }

      const userId = user?._id
      const updatedSchedule = schedule.map((item) => {
        return {
          ...item,
          date: item.date || getDayDate(days.indexOf(item.day) - 1),
        }
      })

      const filteredSchedule = updatedSchedule.filter(
        (item) => item.activity.trim() !== ''
      )

      await updateTrainingDays(userToken, userId, filteredSchedule)
      await updatePreviousTrainingDays(userToken, userId, filteredSchedule)

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

    const value = event.target.value

    if (index !== -1) {
      if (value === '') {
        newSchedule.splice(index, 1)
      } else {
        newSchedule[index].activity = value
      }
    } else {
      if (value !== '') {
        const selectedDate = getDayDate(days.indexOf(day) - 1)
        newSchedule.push({
          day,
          hour,
          activity: value,
          date: selectedDate,
        })
      }
    }

    setSchedule(newSchedule)
  }

  const isDesktop = window.innerWidth > 600

  return (
    <div className="calendar-container">
      <h2 className="text-2xl font-bold mb-4">
        Edit {user?.firstName} {user?.lastName}'s Training Schedule
      </h2>

      <div className="scroll-container">
        {isDesktop && (
          <div className="dates-row">
            <div className="empty-cell"></div>
            {days.slice(1).map((day, index) => (
              <div key={index} className="date-cell">
                {getDayDate(index - 1)}
              </div>
            ))}
          </div>
        )}

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

                {days.slice(1).map((day, index) => {
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
                      <div className="date-display">
                        {scheduleItem
                          ? `${scheduleItem.date} ${day} ${hour}:00`
                          : ''}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button className="close-button" onClick={handlerClear}>
            Clear
          </button>
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <style jsx>{`
        .dates-row {
          display: flex;
        }
        .empty-cell {
          flex: 1;
          text-align: center;
        }
        .date-cell {
          flex: 1;
          text-align: center;
          font-weight: bold;
        }
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
