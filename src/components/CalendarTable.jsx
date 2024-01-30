import React, { useEffect, useState } from 'react'
import { getCurrentUserData } from '../libs/UsersApi'
import '../styles/CalendarControl.css'

export const CalendarTable = () => {
  const [user, setUser] = useState('')
  const [trainingSchedule, setTrainingSchedule] = useState([])

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
            console.error('Error getting current user data')
          }
        })
      } catch (error) {
        console.error('Error parsing stored user data:', error)
      }
    }
  }, [])

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

  return (
    <div className="calendar-container">
      <h2 className="text-2xl font-bold mb-4">
        Welcome back, {user.firstName} {user.lastName}! <br />
        Here is your Training Schedule
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

                {days.slice(-7).map((day, index) => {
                  const session = trainingSchedule.find(
                    (s) => s.day === day && s.hour === hour
                  )
                  const isTrainingSession = !!session

                  return (
                    <td
                      key={index}
                      className={`calendar-cell ${
                        isTrainingSession ? 'training-session' : ''
                      }`}
                    >
                      {isTrainingSession && (
                        <span className="activity w-full break-words">
                          {session.activity}
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
