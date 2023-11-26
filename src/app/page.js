'use client'

import React, { useEffect, useState } from 'react'
import Layout from '@/pages/Layout'
import { Homepage } from '@/pages/Homepage'

const Home = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData)
      setUser(parsedUser)
    }
  }, [])

  return (
    <Layout>
      <Homepage user={user} />
    </Layout>
  )
}

export default Home
