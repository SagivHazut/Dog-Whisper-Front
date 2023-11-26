import React, { useState } from 'react'
import { EditableCalender } from '../EditableCalender'
import Modal from 'react-modal'
import { EditableCell } from './EditableCell'
import { SortableTh } from './SortableTh'
import {
  updateFirstName,
  updateLastName,
  updateEmail,
} from '../../libs/UsersApi'
import Sidebar from '../SideMenu'

export const AdminPanel = ({ users, fetchAllUsers, myUser }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const [sortOrder, setSortOrder] = useState({
    field: null,
    ascending: true,
  })

  const openModal = (user) => {
    setSelectedUser(user)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setSelectedUser(null)
    setModalIsOpen(false)
  }

  const sortableFields = ['firstName', 'lastName', 'email', 'admin']

  const handleSort = (field) => {
    if (sortableFields.includes(field)) {
      setSortOrder((prevOrder) => ({
        field,
        ascending: prevOrder.field === field ? !prevOrder.ascending : true,
      }))
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    const fieldA = sortOrder.field ? a[sortOrder.field] : null
    const fieldB = sortOrder.field ? b[sortOrder.field] : null

    if (fieldA === null || fieldB === null) {
      return 0
    }
    if (sortOrder.field === 'admin') {
      return sortOrder.ascending ? fieldA - fieldB : fieldB - fieldA
    }

    return sortOrder.ascending
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA)
  })
  const handleSave = async (user, fieldName, value) => {
    const token = myUser.token
    try {
      if (fieldName === 'firstName') {
        await updateFirstName(token, user, value)
      } else if (fieldName === 'lastName') {
        await updateLastName(token, user, value)
      } else if (fieldName === 'email') {
        await updateEmail(token, user, value)
      }

      fetchAllUsers()
    } catch (error) {
      console.error('Error during update:', error)
    }
  }
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <SortableTh
                field="id"
                title="id"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableTh
                field="firstName"
                title="First Name"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableTh
                field="lastName"
                title="Last Name"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableTh
                field="email"
                title="Email"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableTh
                field="trainingDays"
                title="Training days"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableTh
                field="admin"
                title="Role"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`bg-white border-b ${
                  index % 2 === 0 ? 'dark:bg-gray-800' : 'dark:bg-gray-700'
                } hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <EditableCell
                  value={user.firstName}
                  handleSave={(value) =>
                    handleSave(user._id, 'firstName', value)
                  }
                />
                <EditableCell
                  value={user.lastName}
                  handleSave={(value) =>
                    handleSave(user._id, 'lastName', value)
                  }
                />
                <EditableCell
                  value={user.email}
                  handleSave={(value) => handleSave(user._id, 'email', value)}
                />
                <td className="px-6 py-4">
                  <ul>
                    {user.trainingDays.map((trainingDay, i) => (
                      <li key={i}>
                        {`${trainingDay.day} at ${trainingDay.hour}: ${trainingDay.activity}`}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">{user.admin ? 'Admin' : 'User'}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    onClick={() => openModal(user)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Calendar Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              width: '80%',
              height: '80%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <EditableCalender
            user={selectedUser}
            closeModal={closeModal}
            fetchAllUsers={fetchAllUsers}
          />
        </Modal>
        <Sidebar />
      </div>
    </>
  )
}
