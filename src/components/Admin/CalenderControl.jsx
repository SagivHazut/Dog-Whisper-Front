import React, { useEffect, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getCurrentUserData } from '../../libs/UsersApi'
import { getAllUsers } from '../../libs/UsersApi'
import { EditableCell } from './EditableCell'
import Sidebar from '../SideMenu'
import '../../styles/CalendarControl.css'
import TrashCan from './TrashCan'
import DraggableUser from './AdminComponents/DraggableUser'
import DroppableCell from './AdminComponents/DroppableCell'

export const CalenderControl = () => {
  const [user, setUser] = useState('')
  const [trainingSchedule, setTrainingSchedule] = useState([])
  const [userList, setUserList] = useState([])

  useEffect(async () => {
    const userToken = localStorage.getItem('user')
    const fetchedUsers = await getAllUsers(userToken)
    console.log('Fetched Users:', fetchedUsers)
    setUserList(fetchedUsers || [])
  }, [])

  const handleRemoveUserFromSession = (sessionId) => {
    setTrainingSchedule((prevTrainingSchedule) =>
      prevTrainingSchedule.filter((session) => session.id !== sessionId)
    )
  }
  const handleRemoveUser = (userId) => {
    setTrainingSchedule((prevTrainingSchedule) =>
      prevTrainingSchedule.filter((session) => session.userId !== userId)
    )
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData)
        const token = parsedUser.token
        const id = parsedUser._id

        getCurrentUserData(token, id).then((userData) => {
          if (userData) {
            setUser(userData)
            setTrainingSchedule(userData.trainingDays || [])
            localStorage.setItem('user', JSON.stringify(userData))
          } else {
          }
        })
      } catch (error) {}
    }
  }, [])
  const handleDropUser = (userId, userName, day, hour) => {
    setTrainingSchedule((prevTrainingSchedule) => {
      const isCellOccupied = prevTrainingSchedule.some(
        (session) => session.day === day && session.hour === hour
      )

      if (isCellOccupied) {
        alert('This cell is already occupied. Please choose a different cell.')
        return prevTrainingSchedule
      } else {
        const newUserSession = {
          id: `session-${new Date().getTime()}`,
          userId: userId,
          day: day,
          hour: hour,
          activity: userName,
        }

        return [...prevTrainingSchedule, newUserSession]
      }
    })
  }

  const handleDropSession = (sessionId, newDay, newHour) => {
    setTrainingSchedule((prevTrainingSchedule) => {
      const sessionIndex = prevTrainingSchedule.findIndex(
        (session) => session.id === sessionId
      )
      if (sessionIndex === -1) {
        console.error('Session not found')
        return prevTrainingSchedule
      }
      const newTrainingSchedule = [...prevTrainingSchedule]
      const updatedSession = {
        ...newTrainingSchedule[sessionIndex],
        day: newDay,
        hour: newHour,
      }
      newTrainingSchedule[sessionIndex] = updatedSession

      return newTrainingSchedule
    })
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
  const chunkArray = (array, size) => {
    return array.reduce((acc, val, i) => {
      let idx = Math.floor(i / size)
      let page = acc[idx] || (acc[idx] = [])
      page.push(val)
      return acc
    }, [])
  }

  const userGroups = chunkArray(userList, 6)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar-container">
        <div className="user-list">
          {userGroups.map((group, index) => (
            <div key={index} className="user-row">
              {group.map((user) => (
                <DraggableUser key={user.id} user={user} />
              ))}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Welcome back, {user.firstName} {user.lastName}! <br />
          Schedule your customer Training Schedule
        </h2>
        <TrashCan onDrop={handleRemoveUser} />

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
                  {days.slice(1).map((day, index) => {
                    const session = trainingSchedule.find(
                      (s) => s.day === day && s.hour === hour
                    )
                    const isTrainingSession = !!session

                    return (
                      <DroppableCell
                        user={user}
                        key={index}
                        hour={hour}
                        day={day}
                        onDropSession={handleDropSession}
                        onDropUser={handleDropUser}
                        trainingSchedule={trainingSchedule}
                        handleRemoveUserFromSession={
                          handleRemoveUserFromSession
                        }
                      >
                        {isTrainingSession ? (
                          <EditableCell
                            value={session.activity}
                            handleSave={(newValue) =>
                              handleSave(session.id, newValue)
                            }
                          />
                        ) : null}
                      </DroppableCell>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <Sidebar />
        </div>
      </div>
    </DndProvider>
  )
}
