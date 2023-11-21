import '../app/globals.css'
import React, { useState, useEffect } from 'react'
import { fetchDogsImages } from '../libs/DogsApis'
import Layout from './Layout'
import { SearchInput } from '@/components/SearchInput'

const Breeds = () => {
  const [apiData, setApiData] = useState(null)

  // call the Images api
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const factsData = await fetchDogsImages()
        setApiData(factsData.data)
      } catch (error) {
        console.error('Error in fetchDataAndSetState:', error)
      }
    }
    fetchDataAndSetState()
  }, [])

  return (
    <Layout>
      <SearchInput apiData={apiData} />
    </Layout>
  )
}

export default Breeds
