import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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

  const fetchAllUsers = async () => {
    const userToken = localStorage.getItem('user')
    try {
      if (userToken) {
        const fetchedUsers = await getAllUsers(userToken)
        setUser(fetchedUsers || [])
      } else {
        console.error('User token not available.')
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])
  useEffect(async () => {
    const userToken = localStorage.getItem('user')
    const fetchedUsers = await getAllUsers(userToken)
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

  useEffect(async () => {
    const userToken = localStorage.getItem('user')
    const fetchedUsers = await getAllUsers(userToken)
    setUserList(fetchedUsers || [])

    let combinedTrainingSchedule = []
    fetchedUsers.forEach((user) => {
      user.trainingDays.forEach((session) => {
        combinedTrainingSchedule.push({
          ...session,
          userId: user._id,
          firstName: `${user.firstName}`,
          lastName: ` ${user.lastName}`,
        })
      })
    })
    setTrainingSchedule(combinedTrainingSchedule)
  }, [])

  const handleDropUser = (userId, firstName, lastName, day, hour, _id) => {
    setTrainingSchedule((prevTrainingSchedule) => {
      const isCellOccupied = prevTrainingSchedule.some(
        (session) => session.day === day && session.hour === hour
      )
      if (isCellOccupied) {
        alert('This cell is already occupied. Please choose a different cell.')
        return prevTrainingSchedule
      } else {
        const newUserSession = {
          activity: '',
          date: '',
          day: day,
          firstName: firstName,
          hour: hour,
          lastName: lastName,
          userId: userId,
          _id: userId,
          sessionId: `session-${new Date().getTime()}`,
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
          {userGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="user-row">
              {group.map((user, userIndex) => (
                // Use a combination of groupIndex and userIndex to ensure uniqueness
                <DraggableUser key={`${groupIndex}-${userIndex}`} user={user} />
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
                        fetchAllUsers={fetchAllUsers}
                      >
                        {isTrainingSession ? (
                          <EditableCell
                            value={session.activity}
                            sessionId={session.id}
                            userId={session.userId}
                            fetchAllUsers={fetchAllUsers}
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
