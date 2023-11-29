import React, { useEffect, useState } from 'react'
import { getCurrentUserData } from '../libs/UsersApi'

export const MyPlanInfo = () => {
  const [user, setUser] = useState(null)
  console.log(user)
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

  const TrainingPlanCard = ({ day, hour, activity, date }) => (
    <div className="w-full p-4">
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-wrap">
        <div className="flex justify-between items-center mb-2 w-full">
          <p className="text-lg font-semibold">{`Date:`}</p>
          <p className="text-lg">{`${date}`}</p>
        </div>
        <div className="flex justify-between items-center mb-2 w-full">
          <p className="text-lg font-semibold">{`Day:`}</p>
          <p className="text-lg">{`${day}`}</p>
        </div>
        <div className="flex justify-between items-center mb-2 w-full">
          <p className="text-lg font-semibold">{`Time:`}</p>
          <p className="text-lg">{`${hour}:00`}</p>
        </div>
        <div className="w-full border-t mb-2"></div>
        <div className="flex justify-center items-center mb-2 w-full">
          <p className="text-lg font-semibold">{`Activity:`}</p>
        </div>
        <p className="text-m w-full break-words">{`${activity}`}</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold mb-4">
        My Previous Training Plans
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {user?.previousTrainings?.length > 0 ? (
          user.previousTrainings.map(({ day, hour, activity, date }, index) => (
            <TrainingPlanCard
              key={index}
              day={day}
              hour={hour}
              date={date}
              activity={activity}
            />
          ))
        ) : (
          <p>No previous training plans available.</p>
        )}
      </div>
    </div>
  )
}
