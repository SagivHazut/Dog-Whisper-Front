import React, { useState } from 'react'
import { validateForm, submitForm } from '../libs/ContactApis'

export const ContactSections = ({ user }) => {
  const [formData, setFormData] = useState({
    fullName: user ? user.firstName : '',
    email: user ? user.email : '',
    message: '',
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    message: '',
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setErrors({
      fullName: '',
      email: '',
      message: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { isValid, errors: newErrors } = validateForm(formData)

    if (!isValid) {
      setErrors(newErrors)
      return
    }

    const submitResult = await submitForm(formData)

    if (submitResult.success) {
      setFormData({
        fullName: user ? user : '',
        email: user ? user : '',
        message: '',
      })
      setShowSuccessModal(true)
    } else {
    }
  }

  return (
    <>
      <div className="w-full bg-white px-6 py-24 sm:py-32 lg:px-8 mx-auto">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Rate Us
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We value your feedback. Please rate your experience.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="mb-6">
          <label
            htmlFor="full-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Full name
          </label>
          <div>
            <input
              type="text"
              name="fullName"
              id="full-name"
              autoComplete="given-name"
              defaultValue={user ? user.firstName : ''}
              onChange={handleChange}
              readOnly={user ? true : false}
              className="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Email
          </label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              defaultValue={user ? user.email : ''}
              onChange={handleChange}
              readOnly={user ? true : false}
              className="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Message
          </label>
          <div>
            <textarea
              name="message"
              id="message"
              rows="1"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
        <div className="mb-6 flex items-center">
          {Object.entries(errors).map(([key, error], index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
          ))}
        </div>
        <div className="mb-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 text-white">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-2xl font-bold text-green-500">
              Form submitted successfully!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
