import React, { useEffect, useState } from 'react'
import {
  updateFirstName,
  updateLastName,
  updatePassword,
} from '../libs/UsersApi'

export const SettingsScreen = () => {
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData)
      setUser(parsedUser)
    }
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (user.newPassword !== user.confirmPassword) {
      console.error('Passwords do not match')
      return
    }

    // Ask for confirmation
    const isConfirmed = window.confirm('Are you sure you want to save changes?')

    if (!isConfirmed) {
      return
    }

    try {
      await updateFirstName(user.token, user._id, user.firstName)
      await updateLastName(user.token, user._id, user.lastName)
      if (user.newPassword) {
        await updatePassword(user.token, user._id, user.newPassword)
      }

      // Reset the new data in the local storage
      const storedUserData = JSON.stringify(user)
      localStorage.setItem('user', storedUserData)

      // Clear password fields
      setUser((prevData) => ({
        ...prevData,
        newPassword: '',
        confirmPassword: '',
      }))
    } catch (error) {
      console.error('Error updating user data:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            className="mt-1 p-2 w-full border rounded-md"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-600"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
