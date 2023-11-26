const apiUrl = 'http://localhost:8080/api/contact'

//getting all users reviews
export const fetchReviews = async () => {
  try {
    const response = await fetch(`${apiUrl}`)
    if (!response.ok) {
      throw new Error('Failed to fetch reviews')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}

//Form validate for rates
export const validateForm = (formData) => {
  let isValid = true
  const newErrors = { fullName: '', email: '', message: '' }
  if (!formData.fullName.trim()) {
    newErrors.fullName = 'Full Name is required'
    isValid = false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
    newErrors.email = 'Enter a valid email address'
    isValid = false
  }
  if (!formData.message.trim()) {
    newErrors.message = 'Message is required'
    isValid = false
  }
  return { isValid, errors: newErrors }
}

//posting a new user review
export const submitForm = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      console.log('Contact data submitted successfully')
      return { success: true }
    } else {
      console.error('Failed to submit contact data')
      return { success: false, error: 'Failed to submit contact data' }
    }
  } catch (error) {
    console.error('Error submitting contact data:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

//deleting user review
export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`${apiUrl}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error deleting review: ${error.message}`)
    }
    return response.json()
  } catch (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}
