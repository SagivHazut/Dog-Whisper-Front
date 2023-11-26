import React, { useEffect, useState } from 'react'
import { AdminPanel } from './AdminPanel'
import { getAllUsers } from '../../libs/UsersApi'

export const AdminFilter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([])
  const [myUser, setMyUser] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  const handleSearch = () => {
    const filteredUsers = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`
      return fullName.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredUsers(filteredUsers)
  }

  const fetchAllUsers = async () => {
    const userToken = localStorage.getItem('user')
    const parsedUser = JSON.parse(userToken)
    setMyUser(parsedUser)
    try {
      if (userToken) {
        const fetchedUsers = await getAllUsers(userToken)
        setUsers(fetchedUsers || [])
        setFilteredUsers(fetchedUsers || [])
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
  return (
    <div className="mb-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search"
        className="border p-2"
        placeholder="Search by name"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white"
        onClick={handleSearch}
      >
        Search
      </button>
      <AdminPanel
        users={filteredUsers}
        fetchAllUsers={fetchAllUsers}
        myUser={myUser}
      />
    </div>
  )
}
