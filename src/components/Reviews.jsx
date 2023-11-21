import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import Avatar from '@mui/material/Avatar'
import { format } from 'date-fns'
import { fetchReviews } from '../libs/ContactApis'

export const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews()
        setReviews(data)
        setExpandedArray(
          data.reduce((acc, article) => {
            acc[article._id] = false
            return acc
          }, {})
        )
      } catch (error) {
        console.error('Error in component:', error)
      }
    }

    fetchData()
  }, [])

  const toggleExpand = (index) => {
    setExpandedArray((prevExpandedArray) => {
      const newArray = { ...prevExpandedArray }
      newArray[index] = !newArray[index]
      return newArray
    })
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Customer Reviews
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover what our customers are saying about their experiences.
          </p>
        </div>

        <div className="mx-auto mt-10 lg:mx-0">
          <Slider {...settings}>
            {reviews.map((article) => (
              <article
                key={article._id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="group relative">
                  <h3 className="text-m font-semibold text-gray-900 group-hover:text-gray-600">
                    {article.message.length > 80 ? (
                      <>
                        {expandedArray[article._id]
                          ? article.message
                          : `${article.message.slice(0, 80)}...`}
                      </>
                    ) : (
                      article.message
                    )}
                  </h3>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleExpand(article._id)
                  }}
                  className="text-indigo-600 hover:underline focus:outline-none"
                >
                  {article.message.length > 80 && (
                    <div>
                      {expandedArray[article._id] ? 'Show Less' : 'Show More'}
                    </div>
                  )}
                </button>
                <div className="relative mt-8 flex items-center gap-x-1">
                  <Avatar
                    className="h-10 w-10 rounded-full"
                    style={{ backgroundColor: article.color }}
                  >
                    {article.fullName.charAt(0).toUpperCase()}
                  </Avatar>

                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      {article.fullName}
                    </p>
                    <time
                      dateTime={article.postedAt}
                      className="text-gray-500 mr-10 "
                    >
                      {format(new Date(article.postedAt), 'MM/dd/yyyy')}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
