'use client'
import React, { useEffect, useState } from 'react'
import { Navigation } from '@/pages/Navigation'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'

const Layout = ({ children }) => {
  const [location, setLocation] = useState(false)
  const router = useRouter()

  const [user, setUser] = useState(null)
  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData)
      setUser(parsedUser)
    }
  }, [])

  useEffect(() => {
    setLocation(window.location.pathname)
  }, [])

  return (
    <div>
      <Suspense fallback={null}>
        <Navigation location={location} user={user} router={router} />
      </Suspense>

      {children}
    </div>
  )
}

export default Layout
