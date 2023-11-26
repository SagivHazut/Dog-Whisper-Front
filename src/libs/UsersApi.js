const apiUrl = 'http://localhost:8080/api'

//login function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      console.log('Login successful!')
      localStorage.setItem(
        'user',
        JSON.stringify({ ...data, token: data.token })
      )
    } else {
      console.error('Login failed:', data.message)
    }
  } catch (error) {
    console.error('Error during login:', error)
  }
}

//register function
export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data))
    } else {
      const errorData = await response.json()
      console.error('Error:', errorData.message)
    }
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
//getting all the users array
export const getAllUsers = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const errorData = await response.json()
      console.error('Error getting all users:', errorData.message)
      return null
    }
  } catch (error) {
    console.error('Error getting all users:', error)
    return null
  }
}

// updating the users trainingDays
export const updateTrainingDays = async (token, trainingDays) => {
  try {
    const response = await fetch(`${apiUrl}/update-training-days`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trainingDays }),
    })

    if (response.ok) {
      console.log('Training days updated successfully')
    } else {
      const errorData = await response.json()
      console.error('Error updating training days:', errorData.message)
    }
  } catch (error) {
    console.error('Error updating training days:', error)
  }
}

// getting the current user data
export const getCurrentUserData = async (token, _id) => {
  try {
    const response = await fetch(`${apiUrl}/user/${_id}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data.user
    } else {
      const errorData = await response.json()
      return null
    }
  } catch (error) {
    console.error('Error getting current user data:', error)
    return null
  }
}

export const updateFirstName = async (token, userId, firstName) => {
  try {
    await fetch(`${apiUrl}/update-first-name/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, userId }),
    })
    console.log('First name updated successfully')
  } catch (error) {
    console.error('Error updating first name:', error)
  }
}

export const updateLastName = async (token, userId, lastName) => {
  try {
    await fetch(`${apiUrl}/update-last-name/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lastName, userId }),
    })
  } catch (error) {
    console.error('Error updating last name:', error)
  }
}

export const updateEmail = async (token, userId, email) => {
  try {
    await fetch(`${apiUrl}/updateEmail/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, userId }),
    })
    console.log('Email updated successfully')
  } catch (error) {
    console.error('Error updating email:', error)
  }
}
