const TheDogApi = 'http://localhost:8080/api/data'

// Full array of dogs breeds
export const fetchDogsImages = async () => {
  try {
    const response = await fetch(`${TheDogApi}/dogsImages`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching dog images:', error)
    throw error
  }
}

// Generate facts about dogs
export const fetchData = async () => {
  try {
    const response = await fetch(`https://dogapi.dog/api/v2/facts`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// Generate random images
export const HomepageDogImages = async () => {
  try {
    const response = await fetch(`${TheDogApi}/homepageDogImages`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching random dog images:', error)
    throw error
  }
}
