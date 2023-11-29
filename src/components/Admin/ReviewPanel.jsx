import React, { useState, useEffect } from 'react'
import Sidebar from '../SideMenu'
import { fetchReviews, deleteReview } from '@/libs/ContactApis'
import { SortableTh } from './SortableTh'
import SearchBar from './ReviewSearchBar'

export const ReviewPanel = () => {
  const [reviews, setReviews] = useState([])
  const [sortOrder, setSortOrder] = useState({
    field: 'fullName',
    ascending: true,
  })
  const [sortedReviews, setSortedReviews] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const formatPostedAt = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }
  // Function to sort reviews based on category and alphabetically
  const sortReviews = (field) => {
    const sorted = [...reviews]
    sorted.sort((a, b) => {
      const fieldA = a[field].toLowerCase()
      const fieldB = b[field].toLowerCase()

      if (sortOrder.ascending) {
        return fieldA.localeCompare(fieldB)
      } else {
        return fieldB.localeCompare(fieldA)
      }
    })
    setSortedReviews(sorted)
  }

  // Fetching reviews data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews()
        setReviews(data)
      } catch (error) {
        console.error('Error in component:', error)
      }
    }

    fetchData()
  }, [])

  // Handle sorting when sortOrder or reviews change
  useEffect(() => {
    sortReviews(sortOrder.field)
  }, [sortOrder, reviews])

  // Trigger search on searchTerm change
  useEffect(() => {
    const filteredReviews = reviews.filter((review) => {
      const fullName = review.fullName.toLowerCase()
      return fullName.includes(searchTerm.toLowerCase())
    })
    setSortedReviews(filteredReviews)
  }, [searchTerm, reviews])

  // Function to handle sorting
  const handleSort = (field) => {
    setSortOrder((prevSortOrder) => ({
      field,
      ascending:
        prevSortOrder.field === field ? !prevSortOrder.ascending : true,
    }))
  }

  // Function to handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId)
      const updatedReviews = reviews.filter((review) => review._id !== reviewId)
      setReviews(updatedReviews)
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }
  return (
    <>
      <div className="flex flex-col ">
        <div className="mb-4 text-2xl font-bold text-center">
          Admin Panel Reviews
        </div>
        <SearchBar onSearch={setSearchTerm} />
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <SortableTh
                  field="fullName"
                  title="Full Name"
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
                  field="message"
                  title="Message"
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableTh
                  field="postedAt"
                  title="Posted At"
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <th scope="col" className="p-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedReviews.map((review) => (
                <tr
                  key={review._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {review.fullName}
                  </td>
                  <td className="px-6 py-4">{review.email}</td>
                  <td className="px-6 py-4">{review.message}</td>
                  <td className="px-6 py-4">
                    {formatPostedAt(review.postedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:underline focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>{' '}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sidebar />
    </>
  )
}
